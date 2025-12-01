interface ValidationData {
  email: string;
  password: string;
  name?: string;
  isRegistering: boolean;
}

export function validateLogin(data: ValidationData): string | null {
  const { email, password, name, isRegistering } = data;

  if (!email || !password) {
    return 'Preencha email e senha.';
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return 'Por favor, insira um e-mail válido.';
  }

  if (password.length < 6) {
    return 'A senha deve ter no mínimo 6 caracteres.';
  }

  if (isRegistering) {
    if (!name || !name.trim()) {
      return 'O nome é obrigatório.';
    }
    if (name.length < 3) {
      return 'O nome deve ter no mínimo 3 caracteres.';
    }
  }

  return null;
}