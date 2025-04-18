import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInValidationSchema, UserSignInRequestDto } from "shared";

import { useAppDispatch, useAppForm } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const SignIn: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { register, handleSubmit, errors } = useAppForm<UserSignInRequestDto>({
		defaultValues: {
			email: "",
			password: "",
		},
		validationSchema: signInValidationSchema,
	});

	const handleSignIn = handleSubmit((data) => {
		dispatch(authActions.signIn(data));
		navigate(-1);
	});

	return (
		<Box sx={{ width: 400, mx: "auto", mt: 4 }}>
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
			>
				Sign In
			</Typography>
			<form onSubmit={handleSignIn}>
				<Box mb={2}>
					<TextField
						fullWidth
						label="Email"
						type="email"
						id="email"
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
				</Box>
				<Box mb={2}>
					<TextField
						fullWidth
						label="Password"
						type="password"
						id="password"
						{...register("password")}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
				</Box>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
				>
					Sign In
				</Button>
			</form>
		</Box>
	);
};

export { SignIn };
