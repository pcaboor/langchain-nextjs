import React, { useEffect, useState } from 'react';
import { File, Folder, Tree, CollapseButton, type TreeViewElement } from "../../../components/filethree/filethree";
import useProject from '~/hooks/use-project';
import CodeDialog from './codeSource';
import { fileIConWithExtension, fileIConWithoutExtension } from '~/lib/fileIcon';
import { IoDocumentText } from 'react-icons/io5';
import { api } from '~/trpc/react';
import useRefetch from '~/hooks/use-refetch';
import { useRouter } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '~/components/ui/alert-dialog';
import { Github, Trash2 } from 'lucide-react';
import { GitHubSyncButton } from './githubSyncButton';

// Étendre l'interface TreeViewElement pour inclure nos données personnalisées
interface ExtendedTreeViewElement extends TreeViewElement {
    sourceCode?: string;
    fullPath?: string;
    originalId?: string; // ID d'origine du fichier dans SourceCodeEmbedding
    fileName?: string; // Ajout du nom de fichier pour l'affichage dans le dialogue de suppression
}

interface FileNode {
    id: string;
    fileName: string;
    sourceCode?: string;
    path: string[];
    isFile: boolean;
    children: Record<string, FileNode>;
    originalId?: string; // ID d'origine pour retrouver le fichier dans SourceCodeEmbedding
}

const ProjectFileTree = () => {
    const [elements, setElements] = useState<ExtendedTreeViewElement[]>([]);
    const [idCounter, setIdCounter] = useState(1);
    const [fileToDelete, setFileToDelete] = useState<{ id: string, fileName: string } | null>(null);
    const { project, projectId, projects } = useProject();
    const [showDeleteFileDialog, setShowDeleteFileDialog] = useState(false);
    const [showDeleteProjectWarning, setShowDeleteProjectWarning] = useState(false);
    const refetch = useRefetch();
    const router = useRouter();

    // Vérifier si c'est le dernier fichier
    const isLastFile = project?.SourceCodeEmbedding?.length === 1;

    const deleteForeverMutation = api.project.deleteProjects.useMutation({
        onSuccess: () => {
            refetch(); // Rafraîchir les projets après suppression définitive
            router.push("/welcome");
        }
    });

    const deleteFileFromProjectMutation = api.project.deleteFileFromProject.useMutation({
        onSuccess: () => {
            setShowDeleteFileDialog(false);
            setShowDeleteProjectWarning(false);
            refetch();
        }
    });

    // Function to get file icon
    const getFileIcon = (fileName: string) => {
        const extension = fileName.includes(".") ? fileName.split('.').pop()?.toLowerCase() : "";
        if (extension && fileIConWithExtension[extension]) {
            const fileInfo = fileIConWithExtension[extension];
            return <span className={fileInfo.color}>{fileInfo.icon}</span>;
        } else if (fileIConWithoutExtension[fileName]) {
            const fileInfo = fileIConWithoutExtension[fileName];
            return <span className={fileInfo.color}>{fileInfo.icon}</span>;
        }
        return <span className="text-gray-400"><IoDocumentText /></span>;
    };

    // Fonction pour trouver l'ID original d'un fichier à partir de son chemin complet
    const findOriginalFileId = (fullPath: string): string | undefined => {
        return project?.SourceCodeEmbedding?.find(file => file.fileName === fullPath)?.id;
    };

    useEffect(() => {
        if (!project?.SourceCodeEmbedding || project.SourceCodeEmbedding.length === 0) {
            return;
        }

        // Build file tree structure
        const root: FileNode = {
            id: 'root',
            fileName: 'root',
            path: [],
            isFile: false,
            children: {}
        };

        // Add each file to the tree
        project.SourceCodeEmbedding.forEach(file => {
            const pathSegments = file.fileName.split('/');
            let currentNode = root;

            // Create path in tree
            for (let i = 0; i < pathSegments.length; i++) {
                const segment = pathSegments[i];
                // Vérifier que segment n'est pas undefined
                if (!segment) continue;

                const isFile = i === pathSegments.length - 1;
                const segmentPath = pathSegments.slice(0, i + 1);
                const fullPath = segmentPath.join('/');

                if (!currentNode.children[segment]) {
                    currentNode.children[segment] = {
                        id: `file-${file.id}-segment-${i}`,
                        fileName: segment,
                        sourceCode: isFile ? file.sourceCode : undefined,
                        path: segmentPath,
                        isFile,
                        children: {},
                        originalId: isFile ? file.id : undefined // Sauvegarder l'ID original seulement pour les fichiers
                    };
                }

                currentNode = currentNode.children[segment];
            }
        });

        // Convert the tree to TreeViewElement format
        const convertToElements = (node: FileNode, id: string): ExtendedTreeViewElement => {
            if (node.isFile) {
                return {
                    id,
                    name: node.fileName,
                    isSelectable: true,
                    sourceCode: node.sourceCode,
                    fullPath: node.path.join('/'),
                    originalId: node.originalId,
                    fileName: node.fileName
                };
            } else {
                return {
                    id,
                    name: node.fileName,
                    isSelectable: true,
                    children: Object.values(node.children).map((child, index) =>
                        convertToElements(child, `${id}-${index}`)
                    )
                };
            }
        };

        // Generate the elements array, skipping the root node
        const generatedElements = Object.values(root.children).map((child, index) =>
            convertToElements(child, `${index + 1}`)
        );

        setElements(generatedElements);

        // Set the counter to the next available ID
        let maxId = 0;
        const findMaxId = (element: ExtendedTreeViewElement) => {
            const numId = parseInt(element.id);
            if (!isNaN(numId) && numId > maxId) {
                maxId = numId;
            }
            element.children?.forEach(findMaxId);
        };
        generatedElements.forEach(findMaxId);
        setIdCounter(maxId + 1);

    }, [project?.SourceCodeEmbedding]);

    // Fonction pour gérer la suppression d'un fichier
    const handleDeleteFile = (element: ExtendedTreeViewElement) => {
        // Si c'est un fichier et qu'il a un originalId (qui correspond à l'ID dans SourceCodeEmbedding)
        if (!element.children && element.originalId) {
            if (isLastFile) {
                setShowDeleteProjectWarning(true);
            } else {
                setFileToDelete({ id: element.originalId, fileName: element.name });
                setShowDeleteFileDialog(true);
            }
        }
    };

    // Create JSX structure recursively
    const renderFolder = (element: ExtendedTreeViewElement, key: string) => {
        if (!element.children) {
            return (
                <File key={element.id} value={element.id} className='text-xs'>
                    <div className="flex items-center justify-between w-full">
                        <CodeDialog
                            fileName={element.name}
                            sourceCode={element.sourceCode || ''}
                            fileIcon={getFileIcon(element.name)}
                        />
                        <Button
                            className='p-0'
                            variant="link"
                            onClick={() => handleDeleteFile(element)}
                        >
                            <Trash2 />
                        </Button>
                    </div>
                </File>
            );
        }

        return (
            <Folder key={element.id} value={element.id} element={element.name} className='text-base'>
                {element.children.map(child => renderFolder(child as ExtendedTreeViewElement, `${key}-${child.id}`))}
            </Folder>
        );
    };

    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border">
            {project?.githubUrl && (
                <div className='p-4'>
                    <div className="flex items-center">
                        <Github className="h-4 w-4 mr-1" />
                        <GitHubSyncButton projectId={projectId!} githubUrl={project.githubUrl} />
                    </div>
                    {project?.GithubSync ? (
                        <p className="text-xs text-muted-foreground">
                            Dernière synchronisation: {new Date(project?.GithubSync.syncedAt).toLocaleString('fr-FR')}
                        </p>
                    ) : (
                        <p className="text-sm text-muted-foreground">Aucune synchronisation récente avec Github</p>
                    )}
                </div>

            )}

            <h1 className="text-xl font-semibold p-4">Code source</h1>
            {elements.length > 0 ? (
                <Tree
                    className="p-2 overflow-hidden rounded-md h-[calc(100vh-200px)]"
                    elements={elements as TreeViewElement[]}
                    initialExpandedItems={elements.slice(0, 10).map(el => el.id)}
                >
                    {elements.map(element => renderFolder(element, element.id))}
                    <CollapseButton elements={elements as TreeViewElement[]} />
                </Tree>
            ) : (
                <div className="flex justify-center items-center h-64 text-muted-foreground">
                    Aucun fichier trouvé
                </div>
            )}

            <AlertDialog open={showDeleteFileDialog} onOpenChange={setShowDeleteFileDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='text-2xl'>Supprimer {fileToDelete?.fileName} ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible.

                            <div className='text-blue-500 mt-2 flex gap-2'>
                                Veuillez noter que si vous supprimez un fichier dans un projet Github, ce dernier ne sera pas supprimé de votre repository mais uniquement sur Conotion.
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteFileDialog(false)}>
                            Annuler
                        </Button>
                        <AlertDialogAction asChild>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    if (fileToDelete) {
                                        deleteFileFromProjectMutation.mutate({
                                            projectId: projectId!,
                                            sourceCodeEmbeddingId: fileToDelete.id
                                        });
                                    }
                                }}
                            >
                                <Trash2 />
                                Supprimer définitivement
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={showDeleteProjectWarning} onOpenChange={setShowDeleteProjectWarning}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Attention !</AlertDialogTitle>
                        <AlertDialogDescription>
                            Ce fichier est le dernier de votre projet. Sa suppression entraînera la suppression complète du projet.
                            Êtes-vous sûr de vouloir continuer ?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button variant="outline" onClick={() => setShowDeleteProjectWarning(false)}>
                            Annuler
                        </Button>
                        <AlertDialogAction asChild>
                            <Button variant="destructive" onClick={() => {
                                deleteForeverMutation.mutate({ projectId: projectId! });
                            }}>
                                Supprimer tout de même
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProjectFileTree;
