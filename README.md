# Documentation Technique : Projet Fake SMS

👋 Bienvenue à la documentation du projet Fake SMS ! Ce document fournit une vue d'ensemble complète du projet, de son architecture, de sa configuration, de son utilisation et de sa maintenance.

## Table des Matières

1. [Vue d'ensemble du projet](#1-vue-densemble-du-projet)
2. [Architecture Technique](#2-architecture-technique)
3. [Instructions de Configuration](#3-instructions-de-configuration)
4. [Dépendances et Prérequis](#4-dépendances-et-prérequis)
5. [Configuration](#5-configuration)
6. [Cas d'utilisation courants](#6-cas-dutilisation-courants)
    * [Envoi d'un faux SMS](#61-envoi-dun-faux-sms)
7. [Guide de Dépannage](#7-guide-de-dépannage)
8. [Considérations de Sécurité](#8-considérations-de-sécurité)
9. [Optimisations de Performance](#9-optimisations-de-performance)
10. [Lignes directrices pour les tests](#10-lignes-directrices-pour-les-tests)
11. [Processus de Déploiement](#11-processus-de-déploiement)
12. [Procédures de Maintenance](#12-procédures-de-maintenance)
13. [Informations de Contact et Contributions](#13-informations-de-contact-et-contributions)


## 1. Vue d'ensemble du projet

Le projet Fake SMS est une application Android simple qui simule l'envoi de faux messages SMS.  Il s'agit d'un projet éducatif visant à illustrer certains aspects du développement Android, notamment l'utilisation des permissions, l'interaction avec la base de données SMS et la gestion des intents.  <ins>**Attention :** Cette application utilise des privilèges root et manipule directement la base de données SMS.  Elle ne doit pas être utilisée en production et doit être testée dans un environnement sûr.</ins> ⚠️


## 2. Architecture Technique

Le projet utilise une architecture classique pour une application Android :

```mermaid
graph LR
    A[MainActivity] --> B(Runtime.getRuntime().exec("su"))
    B --> C{Shell Commands}
    C --> D[mmssms.db (SQL INSERT)]
    D --> E[Broadcast Intent]
    E --> F[SMS App Refresh]
    A --> G(UI Elements: EditText, Button)
    G --> A
    subgraph "Dépendances"
        H[AndroidX]
        I[Jetpack Compose]
        J[Material 3]
        K[JUnit]
        H --> A
        I --> A
        J --> A
        K --> A
    end
```

L'application est principalement composée d'une activité principale (`MainActivity`) qui gère l'interface utilisateur et l'envoi des faux SMS via des commandes shell exécutées avec des privilèges root.  L'utilisation de commandes shell avec des privilèges root est une pratique à haut risque et doit être évitée autant que possible dans les applications de production.

## 3. Instructions de Configuration

1.  **Installer Android Studio:** Téléchargez et installez la dernière version d'Android Studio depuis [le site officiel](https://developer.android.com/studio).
2.  **Cloner le projet:** Clonez le dépôt Git du projet Fake SMS.
3.  **Ouvrir le projet:** Ouvrez le projet dans Android Studio.
4.  **Configurer le SDK:** Assurez-vous que le SDK Android est correctement configuré dans Android Studio (File > Project Structure).
5.  **Construire le projet:** Construisez le projet pour vérifier qu'il n'y a pas d'erreurs de compilation.

## 4. Dépendances et Prérequis

*   **Android SDK:**  Version compatible avec le projet (spécifiée dans le fichier `build.gradle.kts`).
*   **Java JDK:**  Version 11 ou supérieure.
*   **Kotlin:**  Version spécifiée dans le fichier `build.gradle.kts`.
*   **AndroidX:**  Les bibliothèques AndroidX sont utilisées pour les composants de l'interface utilisateur et d'autres fonctionnalités.
*   **Jetpack Compose:**  Utilisé pour créer l'interface utilisateur.
*   **Material 3:**  Pour le design de l'application.


## 5. Configuration

Le projet utilise plusieurs fichiers de configuration :

*   `local.properties` : Contient le chemin vers le SDK Android (**ne jamais le commiter**).
*   `settings.gradle.kts` : Configure les dépôts Gradle.
*   `build.gradle.kts` (niveau projet et module `app`): Définit les plugins, les dépendances, etc.
*   `gradle.properties` : Configure les paramètres Gradle (allocation mémoire JVM, AndroidX, etc.).
*   `libs.versions.toml`: Gestion centralisée des versions des librairies.

## 6. Cas d'utilisation courants

### 6.1 Envoi d'un faux SMS

1.  Entrez le numéro de téléphone et le message dans les champs de texte correspondants.
2.  Cliquez sur le bouton "Créer un faux SMS".
3.  L'application essaiera d'envoyer le faux SMS. Un message Toast affichera le succès ou l'échec de l'opération.


## 7. Guide de Dépannage

| Problème                     | Solution                                                                     |
|------------------------------|-----------------------------------------------------------------------------|
| Erreur de compilation        | Vérifiez les erreurs de compilation dans la console d'Android Studio.         |
| Application plante           | Vérifiez les logs pour identifier la cause du plantage.                       |
| Impossible d'envoyer un SMS | Assurez-vous que l'application dispose des permissions nécessaires (WRITE_SMS). |


## 8. Considérations de Sécurité

<ins>L'application utilise des privilèges root et manipule directement la base de données SMS.  Ceci est extrêmement risqué et ne doit pas être utilisé dans un environnement de production.  Cette application est uniquement à des fins éducatives.</ins> ⚠️  Pour une application de production, il est impératif d'utiliser des méthodes plus sécurisées pour interagir avec le système SMS.


## 9. Optimisations de Performance

*   Minimiser l'utilisation de ressources système.
*   Optimiser le code pour une meilleure performance.
*   Utiliser des techniques de caching appropriées.


## 10. Lignes directrices pour les tests

*   Utiliser JUnit pour les tests unitaires.
*   Utiliser Espresso pour les tests instrumentaux.
*   Couvrir les cas d'utilisation courants avec des tests.


## 11. Processus de Déploiement

1.  Construire un APK signé (release).
2.  Installer l'APK sur un appareil Android.


## 12. Procédures de Maintenance

*   Mettre à jour régulièrement les dépendances.
*   Surveiller les performances et la stabilité de l'application.
*   Implémenter une stratégie de sauvegarde et de restauration.


## 13. Informations de Contact et Contributions

Pour toute question ou contribution, veuillez contacter  [votre adresse email].  Les contributions sont les bienvenues via des pull requests sur le dépôt Git.


**Note importante:**  Ce document est un exemple.  Il est nécessaire d'adapter et d'enrichir ce document en fonction de l'évolution du projet et de ses spécificités.  Des sections supplémentaires peuvent être ajoutées pour une documentation plus complète.
