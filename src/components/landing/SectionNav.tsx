const sectionLinks = [
  { href: "#problem", label: "Проблема" },
  { href: "#solution", label: "Решение" },
  { href: "#features", label: "Возможности" },
  { href: "#demo", label: "Демо" },
  { href: "#learning-path", label: "Путь обучения" },
  { href: "#audience", label: "Аудитория" },
];

const SectionNav = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full bg-background/80 backdrop-blur-md border-b border-primary/20 sticky top-16 md:top-20 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 md:gap-6 py-2 overflow-x-auto scrollbar-hide">
          {sectionLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="whitespace-nowrap px-3 py-1.5 text-sm font-medium text-primary/80 hover:text-primary transition-colors duration-200 hover:drop-shadow-[0_0_6px_hsl(var(--primary))]"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SectionNav;
