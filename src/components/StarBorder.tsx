import React from 'react';
import './StarBorder.css';

export interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  innerClassName?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<any>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}

const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = 'button',
  className = '',
  innerClassName = '',
  color = '#c084fc',
  speed = '6s',
  thickness = 1,
  backgroundColor = '#0c0d10',
  textColor = '#ffffff',
  borderColor = 'rgba(255, 255, 255, 0.12)',
  children,
  style,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`.trim()}
      style={{
        padding: `${thickness}px 0`,
        ...style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed
        }}
      />
      <div
        className={`inner-content ${innerClassName}`.trim()}
        style={{ background: backgroundColor, color: textColor, borderColor }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
export { StarBorder };
