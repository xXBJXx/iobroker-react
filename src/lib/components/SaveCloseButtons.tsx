import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Theme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import { useI18n } from "../i18n";

export interface SaveCloseButtonsProps {
	onSave: (close: boolean) => void;
	onClose: () => void;

	changed: boolean;
	hasErrors?: boolean;
}

const SaveCloseButtons: React.FC<SaveCloseButtonsProps> = (props) => {
	const { onSave, onClose, changed, hasErrors } = props;
	const { translate } = useI18n();
	const theme = useTheme();
	const textOnButtons = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Box
			component="div"
			sx={{
				display: "flex",
				flexFlow: "row nowrap",
				justifyItems: "space-between",
				background: (theme: Theme) => theme.saveToolbar.background,
				gap: (theme: Theme) => theme.spacing(1),
				padding: (theme: Theme) => theme.spacing(1, 4),
			}}
		>
			{textOnButtons ? (
				<>
					<Button
						aria-label="Save"
						variant="contained"
						size="large"
						sx={{
							fontWeight: "bold",
						}}
						startIcon={<SaveIcon />}
						onClick={() => onSave(false)}
						disabled={!changed || !!hasErrors}
					>
						{translate("ra_Save")}
					</Button>
					<Button
						aria-label="Save and Close"
						variant="contained"
						size="large"
						sx={{
							fontWeight: "bold",
						}}
						startIcon={<SaveIcon />}
						onClick={() => onSave(true)}
						disabled={!changed || !!hasErrors}
					>
						{translate("ra_Save and close")}
					</Button>
					<Button
						aria-label="Close"
						variant="contained"
						size="large"
						sx={{
							fontWeight: "bold",
						}}
						startIcon={<CloseIcon />}
						onClick={onClose}
						style={{ marginLeft: "auto" }}
					>
						{translate("ra_Close")}
					</Button>
				</>
			) : (
				<>
					<Button
						aria-label="Save"
						variant="contained"
						size="large"
						sx={{
							fontWeight: "bold",
						}}
						onClick={() => onSave(false)}
						disabled={!changed || !!hasErrors}
					>
						<SaveIcon />
					</Button>
					<Button
						aria-label="Save and Close"
						variant="contained"
						size="large"
						sx={{
							fontWeight: "bold",
						}}
						startIcon={<SaveIcon />}
						endIcon={<CloseIcon />}
						onClick={() => onSave(true)}
						disabled={!changed || !!hasErrors}
					>
						+
					</Button>
					<Button
						aria-label="Close"
						variant="contained"
						size="large"
						sx={{
							fontWeight: "bold",
						}}
						onClick={onClose}
						style={{ marginLeft: "auto" }}
					>
						<CloseIcon />
					</Button>
				</>
			)}
		</Box>
	);
};

export default SaveCloseButtons;
