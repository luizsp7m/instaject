import { NavItem } from "./NavItem";

export function Nav() {
  return (
    <div className="flex flex-col gap-6">
      <NavItem name="Início" page="/" />
      <NavItem name="Seguidores" page="/followers" />
      <NavItem name="Seguindo" page="/following" />
      <NavItem name="Repositórios" page="/repositories" />
    </div>
  );
}