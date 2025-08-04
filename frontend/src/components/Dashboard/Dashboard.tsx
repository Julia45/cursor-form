import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/userSlice';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
  font-size: 32px;
`;

const UserInfo = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
`;

const InfoItem = styled.p`
  margin: 10px 0;
  font-size: 16px;
  
  strong {
    color: #667eea;
  }
`;

const LogoutButton = styled.button`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(231, 76, 60, 0.3);
  }
`;

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { email, name } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DashboardContainer>
      <DashboardCard>
        <Title>Welcome to Your Dashboard!</Title>
        <UserInfo>
          <InfoItem><strong>Name:</strong> {name}</InfoItem>
          <InfoItem><strong>Email:</strong> {email}</InfoItem>
        </UserInfo>
        <p>You have successfully logged in. Your email is saved in Redux state!</p>
        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      </DashboardCard>
    </DashboardContainer>
  );
};

export default Dashboard;