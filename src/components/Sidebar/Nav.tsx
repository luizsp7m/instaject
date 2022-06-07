import { NavItem } from "./NavItem";
import { BiHomeAlt, BiBriefcaseAlt2, BiBookAlt } from "react-icons/bi";

export function Nav() {
  return (
    <div className="flex flex-col">
      <NavItem name="Início" page="/dashboard">
        <BiHomeAlt size={18} />
      </NavItem>

      <NavItem name="Tecnologias" page="/technologies">
        <BiBookAlt size={18} />
      </NavItem>

      <NavItem name="Projetos" page="/projects">
        <BiBriefcaseAlt2 size={18} />
      </NavItem>
    </div>
  );
}