import type { Encrypt } from "~/libs/modules/encrypt/encrypt.js";
import { token } from "~/libs/modules/token/token.js";
import {
	type UserSignInRequestDto,
	type UserSignInResponseDto,
	type UserSignUpRequestDto,
	type UserSignUpResponseDto,
} from "~/modules/users/libs/types/types.js";
import type { UserService } from "~/modules/users/user.service.js";
import { HTTPError, HTTPCode, HTTPErrorMessage } from "~/libs/http/http";

class AuthService {
	private service: UserService;

	private encrypt: Encrypt;

	public constructor(service: UserService, encrypt: Encrypt) {
		this.service = service;
		this.encrypt = encrypt;
	}

	public async signIn(
		userRequestDto: UserSignInRequestDto
	): Promise<UserSignInResponseDto> {
		const { email, password } = userRequestDto;

		const user = await this.service.getByEmail(email);

		if (!user) {
			throw new HTTPError({
				message: HTTPErrorMessage.AUTH.INVALID_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		const userDetails = user.toObject();

		const jwtToken = await token.createToken({ userId: userDetails.id });

		const { passwordHash, passwordSalt } = user.toNewObject();
		const isPasswordValid = await this.encrypt.compare(
			password,
			passwordHash,
			passwordSalt
		);

		if (!isPasswordValid) {
			throw new HTTPError({
				message: HTTPErrorMessage.AUTH.INVALID_CREDENTIALS,
				status: HTTPCode.UNAUTHORIZED,
			});
		}

		return { token: jwtToken, user: userDetails };
	}

	public async signUp(
		userRequestDto: UserSignUpRequestDto
	): Promise<UserSignUpResponseDto> {
		const { email } = userRequestDto;
		const userWithSameEmail = await this.service.getByEmail(email);

		if (userWithSameEmail) {
			throw new HTTPError({
				message: HTTPErrorMessage.AUTH.EMAIL_ALREADY_EXISTS,
				status: HTTPCode.BAD_REQUEST,
			});
		}

		const user = await this.service.create(userRequestDto);

		const jwtToken = await token.createToken({  userId: user.id });

		return { token: jwtToken, user };
	}
}

export { AuthService };
