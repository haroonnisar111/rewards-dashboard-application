import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`;

// ─── Stack wrapper ─────────────────────────────────────────────────────────
export const StackList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #e4eaf2;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(30, 80, 160, 0.06);
`;

// ─── Row ──────────────────────────────────────────────────────────────────
export const Row = styled.div`
  display: grid;
  grid-template-columns: 40px 38px 1fr auto auto;
  align-items: center;
  gap: 14px;
  padding: 13px 18px;
  cursor: pointer;
  position: relative;
  animation: ${slideIn} 0.28s ease both;
  animation-delay: ${({ $index }) => Math.min($index * 30, 300)}ms;
  background: ${({ $selected }) => ($selected ? 'rgba(33,150,243,0.05)' : 'transparent')};
  border-left: 3px solid ${({ $selected }) => ($selected ? '#2196f3' : 'transparent')};
  transition: background 0.15s, border-color 0.15s;

  /* divider between rows */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 18px;
    right: 18px;
    height: 1px;
    background: #f0f3f8;
  }

  &:hover {
    background: ${({ $selected }) => ($selected ? 'rgba(33,150,243,0.07)' : '#f7f9fc')};
  }
`;

// ─── Rank number ──────────────────────────────────────────────────────────
export const Rank = styled.div`
  font-size: 12px;
  font-family: 'DM Mono', monospace;
  font-weight: 500;
  color: ${({ $rank }) => {
    if ($rank === 1) return '#f59e0b';
    if ($rank === 2) return '#94a3b8';
    if ($rank === 3) return '#cd7c4a';
    return '#c5cfe0';
  }};
  text-align: right;
  line-height: 1;
`;

// ─── Avatar circle ─────────────────────────────────────────────────────────
export const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  font-family: 'DM Mono', monospace;
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
`;

// ─── Name + bar block ──────────────────────────────────────────────────────
export const NameBlock = styled.div`
  min-width: 100px;
`;

export const CustomerName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a2233;
  font-family: 'DM Sans', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
`;

export const BarTrack = styled.div`
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: #edf1f7;
  overflow: hidden;
`;

export const BarFill = styled.div`
  height: 100%;
  border-radius: 2px;
  width: ${({ $pct }) => $pct}%;
  background: ${({ $color }) => $color};
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const TxnLabel = styled.span`
  font-size: 11px;
  color: #a0aec0;
  font-family: 'DM Mono', monospace;
  white-space: nowrap;
  flex-shrink: 0;
`;

// ─── Tier badge ────────────────────────────────────────────────────────────
export const TierBadge = styled.div`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 3px 9px;
  border-radius: 20px;
  text-transform: uppercase;
  font-family: 'DM Mono', monospace;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  white-space: nowrap;
`;

// ─── Points ────────────────────────────────────────────────────────────────
export const Points = styled.div`
  font-size: 15px;
  font-weight: 500;
  font-family: 'DM Mono', monospace;
  color: #1a2233;
  white-space: nowrap;
  text-align: right;

  span {
    font-size: 11px;
    font-weight: 400;
    color: #a0aec0;
    margin-left: 3px;
    font-family: 'DM Sans', sans-serif;
  }
`;