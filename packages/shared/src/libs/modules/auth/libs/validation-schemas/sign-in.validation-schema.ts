import { z } from "zod";

import { UserValidationRegexRule, UserValidationRule } from "../enums/enums";

type UserSignInRequestValidationDto = {
	email: z.ZodString;
	password: z.ZodString;
};

const signInValidationSchema = z
	.object<UserSignInRequestValidationDto>({
		email: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH)
			.regex(UserValidationRegexRule.EMAIL_LOCAL_PART_VALID_CHARS)
			.regex(UserValidationRegexRule.EMAIL_DOMAIN_PART_VALID_CHARS),
		password: z
			.string()
			.trim()
			.min(UserValidationRule.NON_EMPTY_STRING_MIN_LENGTH)
			.regex(UserValidationRegexRule.PASSWORD_VALID_CHARS)
			.regex(
				UserValidationRegexRule.PASSWORD_CONTAINS_LETTER_NUMBER_AND_LENGTH
			),
	})
	.required();

export { signInValidationSchema };
