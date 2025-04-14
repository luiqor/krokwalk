import { signUpValidationSchema, UserSignUpRequestDto } from "shared";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

import { useAppDispatch, useAppForm } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const SignUp: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { register, handleSubmit, errors } = useAppForm<UserSignUpRequestDto>({
		defaultValues: {
			email: "",
			password: "",
			username: "",
		},
		validationSchema: signUpValidationSchema,
	});

	const handleSignUp = handleSubmit((data) => {
		dispatch(authActions.signUp(data));
		navigate(-1);
	});

	return (
		<Box sx={{ width: 400, mx: "auto", mt: 4 }}>
			<Typography
				variant="h4"
				component="h1"
				gutterBottom
			>
				Sign Up
			</Typography>
			<form onSubmit={handleSignUp}>
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
						label="Username"
						type="text"
						id="username"
						{...register("username")}
						error={!!errors.username}
						helperText={errors.username?.message}
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
					Sign Up
				</Button>
			</form>
		</Box>
	);
};

export { SignUp };
