import { FaGolang, FaCss3, FaHtml5, FaPython, FaJava, FaPhp, FaRust, FaSwift, FaDocker, FaFileSignature, FaFilePdf, FaDatabase } from "react-icons/fa6"; //
import { PiMarkdownLogo } from "react-icons/pi";
import { RiJavascriptFill, RiNextjsFill, RiReactjsLine } from "react-icons/ri";
import { TbBrandCSharp, TbSql } from "react-icons/tb";
import { IoDocumentText } from "react-icons/io5";
import { VscVscode } from "react-icons/vsc";
import { LuFileCode } from "react-icons/lu";
import { SiKotlin, SiTypescript, SiGitignoredotio, SiAssemblyscript, SiRuby, SiC, SiCplusplus, SiPerl, SiLua, SiDart, SiHaxe, SiClojure, SiElixir, SiR, SiYaml, SiGnubash, SiToml, SiXml, SiPrisma, SiJson } from "react-icons/si"; //
import { JSX } from "react";
import { DiVisualstudio } from "react-icons/di";
import { VscJson } from "react-icons/vsc";
import { ImSvg } from "react-icons/im";
import { BiSolidFilePng } from "react-icons/bi";

type FileIconMap = Record<string, { icon: JSX.Element; color: string }>;

export const fileIConWithExtension: FileIconMap = {
    py: { icon: <FaPython />, color: "text-green-500" },
    java: { icon: <FaJava />, color: "text-red-500" },
    php: { icon: <FaPhp />, color: "text-purple-600" },
    css: { icon: <FaCss3 />, color: "text-blue-500" },
    html: { icon: <FaHtml5 />, color: "text-orange-500" },
    rb: { icon: <SiRuby />, color: "text-red-600" },
    rs: { icon: <FaRust />, color: "text-orange-600" },
    swift: { icon: <FaSwift />, color: "text-red-400" },
    kt: { icon: <SiKotlin />, color: "text-purple-500" },
    cs: { icon: <TbBrandCSharp />, color: "text-blue-700" },
    sh: { icon: <SiGnubash />, color: "text-orange-500" },
    bash: { icon: <SiGnubash />, color: "text-black" },
    json: { icon: <VscJson />, color: "text-yellow-600" },
    yaml: { icon: <SiYaml />, color: "text-orange-400" },
    toml: { icon: <SiToml />, color: "text-gray-600" },
    xml: { icon: <SiXml />, color: "text-blue-700" },
    md: { icon: <PiMarkdownLogo />, color: "text-gray-500" },
    pl: { icon: <SiPerl />, color: "text-blue-400" },
    lua: { icon: <SiLua />, color: "text-blue-500" },
    dart: { icon: <SiDart />, color: "text-blue-400" },
    haxe: { icon: <SiHaxe />, color: "text-orange-500" },
    clj: { icon: <SiClojure />, color: "text-blue-500" },
    ex: { icon: <SiElixir />, color: "text-purple-600" },
    r: { icon: <SiR />, color: "text-blue-500" },
    c: { icon: <SiC />, color: "text-blue-600" },
    cpp: { icon: <SiCplusplus />, color: "text-blue-400" },
    dockerfile: { icon: <FaDocker />, color: "text-blue-300" },
    license: { icon: <FaFileSignature />, color: "text-orange-500" },
    txt: { icon: <IoDocumentText />, color: "text-gray-400" },
    log: { icon: <IoDocumentText />, color: "text-gray-400" },
    conf: { icon: <LuFileCode />, color: "text-gray-600" },
    ini: { icon: <LuFileCode />, color: "text-gray-500" },
    prisma: { icon: <SiPrisma />, color: "text-emerald-400" },
    asm: { icon: <SiAssemblyscript />, color: "text-gray-500" },
    tsx: { icon: <RiReactjsLine />, color: "text-blue-500" },
    jsx: { icon: <RiReactjsLine />, color: "text-blue-200" },
    sln: { icon: <VscVscode />, color: "text-blue-500" },
    csproj: { icon: <DiVisualstudio />, color: "text-purple-500" },
    sql: { icon: <TbSql />, color: "text-blue-600" },
    db: { icon: <FaDatabase />, color: "text-yellow-600" },
    gitignore: { icon: <SiGitignoredotio />, color: 'text-orange-500 ' },
    svg: { icon: <ImSvg />, color: 'text-yellow-300' },
    pdf: { icon: <FaFilePdf />, color: "text-red-500" },
    png: { icon: <BiSolidFilePng />, color: 'text-green-500' }
};

export const fileIConWithoutExtension: FileIconMap = {
    Dockerfile: { icon: <FaDocker />, color: "text-blue-300" },
    LICENSE: {
        icon: <FaFileSignature />
        , color: "text-orange-500"
    },
};
