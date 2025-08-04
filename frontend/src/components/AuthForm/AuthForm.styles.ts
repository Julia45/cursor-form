import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

export const AuthCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #555;
  font-size: 14px;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#e74c3c' : '#e1e8ed'};
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#e74c3c' : '#667eea'};
    background: white;
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(231, 76, 60, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'google' }>`
  padding: 14px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  ${props => props.variant === 'google' ? `
    background: #fff;
    color: #333;
    border: 2px solid #e1e8ed;
    
    &:hover {
      background: #f8f9fa;
      border-color: #ccc;
    }
  ` : `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e1e8ed;
  }
  
  span {
    padding: 0 15px;
    color: #666;
    font-size: 14px;
  }
`;

export const ToggleText = styled.p`
  text-align: center;
  margin-top: 20px;
  color: #666;
  
  button {
    background: none;
    border: none;
    color: #667eea;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;
  }
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;