import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Avatar,
  NameBlock,
  CustomerName,
  BarRow,
  TxnLabel,
  Points,
} from "../styles/rewardRowStyles";
import { MESSAGES } from "../constant/constant";

// ─── Constants ────────────────────────────────────────────────────────────────
const PALETTE = [
  { bg: "#e8f0fe", fg: "#1a73e8" },
  { bg: "#e6f4ea", fg: "#1e8e3e" },
  { bg: "#fce8e6", fg: "#d93025" },
  { bg: "#fef3e2", fg: "#e37400" },
  { bg: "#f3e8fd", fg: "#8430ce" },
  { bg: "#e8f5fa", fg: "#0097a7" },
];

const getColor = (id) => PALETTE[id % PALETTE.length];
const CustomerRow = ({ customer, selected, index, onClick }) => {
  const color = getColor(customer.id);

  return (
    <Row
      $selected={selected}
      $index={index}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <Avatar $bg={color.bg} $fg={color.fg}>
        {MESSAGES.C}{customer.id}
      </Avatar>

      <NameBlock>
        <CustomerName>
          {" "}
          {MESSAGES.CUSTOMER} {customer.id}
        </CustomerName>
        <BarRow>
          <TxnLabel>
            {customer.transactionCount} {MESSAGES.TRANSACTION}
          </TxnLabel>
        </BarRow>
      </NameBlock>

      <Points>
        {customer.totalRewards.toLocaleString()}
        <span>{MESSAGES.POINTS}</span>
      </Points>
    </Row>
  );
};

CustomerRow.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalRewards: PropTypes.number.isRequired,
    transactionCount: PropTypes.number.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(CustomerRow);
