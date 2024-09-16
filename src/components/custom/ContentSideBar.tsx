// src/components/custom/ContentSideBar.tsx
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { Button } from '../ui/button';
import { useLocation } from 'wouter';


interface SidebarItemProps {
  textoBoton: string;
  icono: React.ReactNode;
  path?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ textoBoton, icono, path }) => {
  const [, navigate] = useLocation();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <Button variant="ghost" className="flex items-center w-full justify-start" onClick={handleClick}>
      {icono}
      <span className="ml-2">{textoBoton}</span>
    </Button>
  );
};

interface SidebarSectionProps {
  titulo: string;
  items: SidebarItemProps[];
}

const SidebarSectionComponent: React.FC<SidebarSectionProps> = ({ titulo, items }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-2">{titulo}</h2>
      {items.map((item, index) => (
        <SidebarItem key={index} textoBoton={item.textoBoton} icono={item.icono} />
      ))}
    </div>
  );
};

const ContentSideBar: React.FC = () => {
  const { sidebarSections } = useContext(AppContext);

  // Función para mapear el nombre del icono a un componente SVG
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'new_releases':
        return (
          <svg width="20" height="20" fill="currentColor">
            {/* SVG correspondiente */}
          </svg>
        );
      case 'trending_up':
        return (
          <svg width="20" height="20" fill="currentColor">
            {/* SVG correspondiente */}
          </svg>
        );
      case 'star':
        return (
          <svg width="20" height="20" fill="currentColor">
            {/* SVG correspondiente */}
          </svg>
        );
      // Agrega más casos según sea necesario
      default:
        return (
          <svg width="20" height="20" fill="currentColor">
            {/* Icono por defecto */}
          </svg>
        );
    }
  };

  // Mapear las secciones del sidebar a componentes
  const sidebarContent = sidebarSections.map((section, index) => {
    const items = section.items.map((item) => ({
      textoBoton: item.name,
      icono: getIconComponent(item.icon),
      path: item.path,
    }));

    return <SidebarSectionComponent key={index} titulo={section.title} items={items} />;
  });

  return <div className="flex flex-col gap-6 my-6">{sidebarContent}</div>;
};

export default ContentSideBar;
