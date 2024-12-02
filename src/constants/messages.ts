interface AuthMessages {
  success?: string;
  error?: string;
}

interface Messages {
  login: AuthMessages;
  register: AuthMessages;
  logout: AuthMessages;
}

export const Messages: Messages = {
  login: {
    success: "Login successful! Welcome back.",
    error: "Login failed. Please check your credentials and try again.",
  },
  register: {
    success:
      "Registration successful!",
    error: "Registration failed. Please try again later or contact support.",
  },
  logout: {
    success: "Logout successful!",
  },
};
