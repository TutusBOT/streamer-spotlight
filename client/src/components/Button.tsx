import React, { FC } from "react";

const variants = {
	filled:
		"rounded-xl bg-purple-700 py-2 px-4 text-white transition-colors hover:bg-purple-600",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	type: "button" | "submit";
	children?: React.ReactNode;
	variant: keyof typeof variants;
}

const Button: FC<ButtonProps> = ({
	type = "button",
	children = null,
	variant,
	className,
	...props
}) => (
	<button
		type={type}
		className={`cursor-pointer ${variants[variant]} ${className}`}
		{...props}
	>
		{children}
	</button>
);

export default Button;
