interface OnboardingSlideProps {
  title: string;
  description: string;
  emoji: string;
}

export function OnboardingSlide({
  title,
  description,
  emoji,
}: OnboardingSlideProps) {
  return (
    <div className="flex flex-col items-center justify-center px-8 text-center">
      <div className="mb-8 text-7xl">{emoji}</div>
      <h2 className="mb-4 whitespace-pre-line text-2xl font-bold leading-tight">
        {title}
      </h2>
      <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
