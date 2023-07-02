import React, { FC } from "react";

const variants = {
	filled:
		"rounded-xl bg-purple-700 py-2 px-4 text-white transition-colors hover:bg-purple-600",
	outlined:
		"rounded-xl border-[1px] border-purple-700 py-2 px-2 text-white transition-colors hover:border-purple-600 hover:bg-purple-700",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: keyof typeof variants;
}

const Button: FC<ButtonProps> = ({
	children = null,
	variant,
	className,
	...props
}) => (
	<button
		className={`cursor-pointer ${variants[variant]} ${className}`}
		{...props}
	>
		{children}
	</button>
);

export default Button;
