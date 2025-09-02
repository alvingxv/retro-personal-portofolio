interface ComingSoonProps {
  title: string;
  message: string;
  icon?: string;
}

export const ComingSoon = ({ title, message, icon = "🚧" }: ComingSoonProps) => {
  return (
    <div className="container-retro p-8 max-w-2xl mx-auto text-center">
      <div className="text-8xl mb-6">{icon}</div>
      <h1 className="text-3xl font-bold text-primary mb-6">{title}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        {message}
      </p>
      <div className="bg-secondary border-2 border-primary p-6" style={{boxShadow: 'var(--shadow-pixel)'}}>
        <p className="text-foreground">
          This section is currently under development. Check back soon for exciting new content!
        </p>
      </div>
    </div>
  );
};
