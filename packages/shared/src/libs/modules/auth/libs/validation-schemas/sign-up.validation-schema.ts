import { z } from "zod";

import {
	UserValidationRegexRule,
	UserValidationRule,
} from "../enums/enums.js";

type UserSignUpRequestValidationDto = {
	email: z.ZodString;
	username: z.ZodString;
	password: z.ZodString;
};

const signUpValidationSchema = z
	.object<UserSignUpRequestValidationDto>({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH)
			.regex(UserValidationRegexRule.EMAIL_LOCAL_PART_VALID_CHARS, {
				message: "Please enter a valid email address",
			})
			.regex(UserValidationRegexRule.EMAIL_DOMAIN_PART_VALID_CHARS),
		username: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH)
			.regex(UserValidationRegexRule.USERNAME_VALID_CHARS_MIN_MAX, {
				message: "Please enter a valid username between 3 and 20 characters",
			}),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH)
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS)
			.regex(
				UserValidationRegexRule.PASSWORD_CONTAINS_LETTER_NUMBER_AND_LENGTH,
				{
					message:
						"Password must contain at least one letter, one number, and be at least 6 characters long",
				}
			),
	})
	.required();

export { signUpValidationSchema };
