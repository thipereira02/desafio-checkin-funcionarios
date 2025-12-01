import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import axios from 'axios';
import styled from 'styled-components';
import { BaseCard, BaseButton, BaseInput, PageContainer } from '../components/SharedStyles';
import { validateLogin } from '../components/validation';

const LoginContainer = styled(PageContainer)`
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const LoginCard = styled(BaseCard)`
  width: 100%;
  max-width: 28rem;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #1f2937;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const PrimaryButton = styled(BaseButton)`
  background-color: #2563eb;
  color: white;
  &:hover { background-color: #1d4ed8; }
  &:disabled { background-color: #9ca3af; }
`;

const SwitchButton = styled.button`
  margin-top: 1.5rem;
  font-size: 0.875rem;
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 100%;
  &:hover { text-decoration: underline; }
`;

export function LoginPage() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const validationError = validateLogin({ email, password, name, isRegistering });
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      if (isRegistering) {
        await axios.post(`${API_URL}/auth/register`, { name, email, password });
        setIsRegistering(false);
        setPassword('');
        alert('Conta criada com sucesso! Faça login agora.');
      } else {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Ocorreu um erro desconhecido.';
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', background: '#dbeafe', borderRadius: '50%', color: '#2563eb' }}>
            <LogIn size={32} />
          </div>
        </div>
        <Title>{isRegistering ? 'Criar Nova Conta' : 'Acesso ao Ponto'}</Title>

        <Form onSubmit={handleSubmit} noValidate>
          {isRegistering && (
            <InputGroup>
              <Label>Nome Completo</Label>
              <BaseInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: João Silva" />
            </InputGroup>
          )}

          <InputGroup>
            <Label>Email Corporativo</Label>
            <BaseInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.email@empresa.com" />
          </InputGroup>

          <InputGroup>
            <Label>Senha</Label>
            <BaseInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
          </InputGroup>

          {error && <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.875rem', fontWeight: 500 }}>{error}</p>}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Carregando...' : isRegistering ? 'Cadastrar' : 'Entrar'}
          </PrimaryButton>
        </Form>

        <SwitchButton onClick={() => { setIsRegistering(!isRegistering); setError(''); }}>
          {isRegistering ? <LogIn size={16} /> : <UserPlus size={16} />}
          {isRegistering ? 'Já tenho conta' : 'Não tenho cadastro'}
        </SwitchButton>
      </LoginCard>
    </LoginContainer>
  );
}