import styled from 'styled-components';

export const BaseCard = styled.div`
  background-color: white;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); /* shadow-sm */
  overflow: hidden;
  padding: 1.5rem;
`;

export const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem; /* rounded-md */
  font-weight: 600; /* font-semibold */
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const BaseInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  margin-top: 0.25rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6; /* blue-500 */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb; /* gray-50 */
  display: flex;
  flex-direction: column;
`;