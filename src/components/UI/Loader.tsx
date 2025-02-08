import styled, { keyframes } from 'styled-components';
import { colors } from '@/styles';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div<{ size?: number }>`
  width: ${props => props.size || 40}px;
  height: ${props => props.size || 40}px;
  margin: 0 auto;
  
  .spinner {
    width: 100%;
    height: 100%;
    border: 3px solid ${colors.black200};
    border-top: 3px solid ${colors.purple};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

const Loader = ({ size }: { size?: number }) => {
  return (
    <LoaderWrapper size={size}>
      <div className="spinner" />
    </LoaderWrapper>
  );
};

export default Loader; 