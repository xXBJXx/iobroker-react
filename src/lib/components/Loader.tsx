/**
 * Copyright 2018-2021 bluefox <dogafox@gmail.com>
 *
 * MIT License
 *
 **/
import { Box } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import React from "react";

export interface LoaderProps {
	/** The size in pixels of this loader. */
	size?: number;
}

const Loader: React.FC<LoaderProps> = (props) => {
	const { size = 234 } = props;

	return (
		<Box
			component="div"
			sx={{
				background: (theme: Theme) => theme.palette.logo.background,
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: 1000,
				overflow: "hidden",
				display: "grid",
				alignItems: "center",
				justifyItems: "center",
				"--size": `${size}px`,
			}}
		>
			<Box
				component="div"
				sx={{
					position: "relative",
					width: "var(--size)",
					height: "var(--size)",

					overflow: "hidden",
					borderRadius: "50%",
					zIndex: 2,
				}}
			>
				<Box
					component="div"
					sx={{
						position: "absolute",
						width: "4.5%",
						height: "16%",
						top: 0,
						zIndex: 2,
						background: (theme: Theme) =>
							theme.palette.logo.background,
						right: "57%",
						animation: "$logo-color-cutout 1s 1 ease forwards",
						"@keyframes logo-color-cutout": {
							"0%": {
								background: (theme: Theme) =>
									theme.palette.logo.grow,
							},
							"100%": {
								background: (theme: Theme) =>
									theme.palette.logo.background,
							},
						},
					}}
				/>
				<Box
					component="div"
					sx={{
						position: "absolute",
						width: "4.5%",
						height: "16%",
						top: 0,
						zIndex: 2,
						background: (theme: Theme) =>
							theme.palette.logo.background,
						left: "57%",
						animation: "$logo-color-cutout 1s 1 ease forwards",
						"@keyframes logo-color-cutout": {
							"0%": {
								background: (theme: Theme) =>
									theme.palette.logo.grow,
							},
							"100%": {
								background: (theme: Theme) =>
									theme.palette.logo.background,
							},
						},
					}}
				/>
				<Box
					component="div"
					sx={{
						position: "absolute",
						width: "100%",
						height: "100%",
						boxSizing: "border-box",
						borderColor: (theme: Theme) =>
							theme.palette.logo.secondary,
						borderTopColor: (theme: Theme) =>
							theme.palette.logo.primary,
						borderRadius: "50%",
						borderStyle: "solid",
						borderWidth: "calc(0.132 * var(--size))",
						animation:
							"$logo-color-outside 1.5s, $logo-spin 1.5s linear infinite",
						"@keyframes logo-color-outside": {
							"0%": {
								borderColor: "transparent",
							},
							"100%": {
								borderTopColor: (theme: Theme) =>
									theme.palette.logo.primary,
								borderLeftColor: (theme: Theme) =>
									theme.palette.logo.secondary,
								borderBottomColor: (theme: Theme) =>
									theme.palette.logo.secondary,
								borderRightColor: (theme: Theme) =>
									theme.palette.logo.secondary,
							},
						},
						"@keyframes logo-spin": {
							"100%": {
								transform: "rotate(360deg)",
							},
						},
					}}
				/>
				<Box
					component="div"
					sx={{
						position: "absolute",
						width: "14%",
						height: "68%",
						top: "16%",
						left: "43%",

						borderRadius: "50% / 2%",
						background: (theme: Theme) =>
							theme.palette.logo.primary,
						animation: "$logo-i-fade 2.5s",
						"@keyframes logo-i-fade": {
							"0%": {
								opacity: 0,
							},
							"100%": {
								opacity: 1,
							},
						},
					}}
				></Box>
				<Box
					component="div"
					sx={{
						position: "absolute",
						width: "var(--size)",
						height: "var(--size)",
						background: (theme: Theme) => theme.palette.logo.grow,
						borderRadius: "50%",
						textAlign: "center",
						zIndex: 1,
						transform: "scale(1.05)",
						animation: "$logo-grow 1s 1 ease forwards",
						"@keyframes logo-grow": {
							"0%": {
								transform: "scale(1.05)",
								background: (theme: Theme) =>
									theme.palette.logo.grow,
							},
							"100%": {
								transform: "scale(10)",
								background: (theme: Theme) =>
									theme.palette.logo.background,
							},
						},
					}}
				></Box>
			</Box>
		</Box>
	);
};
export default Loader;
