import styled, { createGlobalStyle } from 'styled-components';
// ─── Global fonts ─────────────────────────────────────────────────────────────
export const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
`;
 
export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
`;
 
export const SearchInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 14px;
  background: #ffffff;
  border: 1.5px solid #e4eaf2;
  border-radius: 10px;
  color: #1a2233;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  outline: none;
  box-shadow: 0 1px 3px rgba(33, 150, 243, 0.04);
  transition: border-color 0.2s, box-shadow 0.2s;
 
  &::placeholder { color: #8a9ab5; }
 
  &:focus {
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }
`;
 
export const SortButton = styled.button`
  height: 40px;
  padding: 0 16px;
  border: 1.5px solid ${({ $active }) => ($active ? '#2196f3' : '#e4eaf2')};
  border-radius: 10px;
  background: ${({ $active }) => ($active ? '#2196f3' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#8a9ab5')};
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
 
  &:hover {
    border-color: #2196f3;
    color: ${({ $active }) => ($active ? '#ffffff' : '#2196f3')};
  }
`;
 
export const CountLabel = styled.p`
  font-size: 12px;
  color: #8a9ab5;
  margin-bottom: 1rem;
  font-family: 'DM Mono', monospace;
`;
 
// Column header row
export const ColumnHeader = styled.div`
  display: grid;
  grid-template-columns: 40px 38px 1fr auto auto;
  gap: 14px;
  padding: 8px 18px 8px 21px; /* +3px left to align with border-left offset */
  margin-bottom: 4px;
`;
 
export const ColLabel = styled.span`
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #a0aec0;
  font-family: 'DM Mono', monospace;
 
  &:last-child { text-align: right; }
`;
 
export const EmptyState = styled.div`
  padding: 3rem;
  text-align: center;
  color: #8a9ab5;
  font-size: 14px;
`;
 
export const Sentinel = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;
`;
 
export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #dce8f5;
  border-top-color: #2196f3;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
 
  @keyframes spin { to { transform: rotate(360deg); } }
`;