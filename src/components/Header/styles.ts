import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;
  header {
    max-width: 100%;
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    nav {
      a {
        position: relative;
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        & + a {
          margin-left: 32px;
        }
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
        &:hover:after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          opacity: 1;
          width: 100%;
          height: 100%;
          border-bottom: 2px solid #ff872c;
        }
      }
    }
  }
`;
