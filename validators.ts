// Définir les types localement s'ils n'existent pas dans ../types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Validation d'email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validation de mot de passe
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Le mot de passe doit contenir au moins 6 caractères');
  }
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule');
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule');
  }
  if (!/(?=.*\d)/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation de formulaire de connexion
export const validateLoginForm = (data: LoginData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.email.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!data.password.trim()) {
    errors.password = 'Le mot de passe est requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validation de formulaire d'inscription
export const validateRegisterForm = (data: RegisterData): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!data.name?.trim()) {
    errors.name = 'Le nom est requis';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  }

  if (!data.email.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Format d\'email invalide';
  }

  if (!data.password.trim()) {
    errors.password = 'Le mot de passe est requis';
  } else {
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors.join(', ');
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Validation de quantité de billets
export const validateTicketQuantity = (quantity: number, available: number): { isValid: boolean; message: string } => {
  if (quantity < 1) {
    return { isValid: false, message: 'La quantité doit être au moins 1' };
  }
  
  if (quantity > 6) {
    return { isValid: false, message: 'Maximum 6 billets par match' };
  }

  if (quantity > available) {
    return { isValid: false, message: `Seulement ${available} places disponibles` };
  }

  return { isValid: true, message: '' };
};

// Validation de carte de crédit (simplifiée)
export const validateCreditCard = (cardNumber: string): boolean => {
  // Simulation simple pour l'exercice
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleaned);
};

// Validation de date future
export const isFutureDate = (dateString: string): boolean => {
  return new Date(dateString) > new Date();
};