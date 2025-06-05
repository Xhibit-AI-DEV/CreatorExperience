export interface SectionProps {
  className?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

export interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
