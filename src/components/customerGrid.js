import React, { useMemo, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { calculateRewards } from "../utils/calculateRewards";
import CustomerRow from "./rewardsCard";
import { StackList } from "../styles/rewardRowStyles";
import {
  CountLabel,
  ColumnHeader,
  ColLabel,
  EmptyState,
  GlobalFonts,
  SearchInput,
  Sentinel,
  SortButton,
  Toolbar,
  Spinner,
} from "../styles/customerGridStyles";
import { BUTTONS, CUSTOMERS_PER_PAGE, MESSAGES } from "../constant/constant";

function calculateCustomerRewards(transactions) {
  const rewardsByCustomer = transactions.reduce(
    (acc, { customerId, amount }) => {
      const pts = calculateRewards(amount);
      if (!acc[customerId]) acc[customerId] = { total: 0, transactionCount: 0 };
      acc[customerId].total += pts;
      acc[customerId].transactionCount += 1;
      return acc;
    },
    {},
  );

  return Object.entries(rewardsByCustomer).map(
    ([customerId, customerData]) => ({
      id: Number(customerId),
      totalRewards: customerData.total,
      transactionCount: customerData.transactionCount,
    }),
  );
}

const CustomerGrid = ({ transactions, onSelectCustomer }) => {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(MESSAGES.REWARDS);
  const [selected, setSelected] = useState(null);
  const [visCount, setVisCount] = useState(CUSTOMERS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const allCustomers = useMemo(
    () => calculateCustomerRewards(transactions),
    [transactions],
  );

  const filtered = useMemo(() => {
    const searchTerm = query.toLowerCase().trim();
    const matchingCustomers = searchTerm
      ? allCustomers.filter((customer) =>
          `customer ${customer.id}`.includes(searchTerm),
        )
      : [...allCustomers];

    return matchingCustomers.sort((a, b) =>
      sortKey === MESSAGES.REWARDS
        ? b.totalRewards - a.totalRewards
        : b.transactionCount - a.transactionCount,
    );
  }, [allCustomers, query, sortKey]);

  const visibleCustomers = filtered.slice(0, visCount);
  const hasMoreCustomersToLoad = visCount < filtered.length;

  useEffect(() => {
    setVisCount(CUSTOMERS_PER_PAGE);
  }, [query, sortKey]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMoreCustomersToLoad) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisCount((prev) =>
              Math.min(prev + CUSTOMERS_PER_PAGE, filtered.length),
            );
            setLoading(false);
          }, 400);
        }
      },
      { threshold: 0.1 },
    );

    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [hasMoreCustomersToLoad, loading, filtered.length]);

  const handleSelect = (id) => {
    const next = selected === id ? null : id;
    setSelected(next);
    if (next !== null) onSelectCustomer(next);
  };

  return (
    <>
      <GlobalFonts />
      <Toolbar>
        <SearchInput
          type="text"
          placeholder="Search customers…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SortButton
          $active={sortKey === MESSAGES.REWARDS}
          onClick={() => setSortKey(MESSAGES.REWARDS)}
        >
          {BUTTONS.TOP_REWARDS}
        </SortButton>
        <SortButton
          $active={sortKey === MESSAGES.TRANSACTION}
          onClick={() => setSortKey(MESSAGES.TRANSACTION)}
        >
          {BUTTONS.MOST_ACTIVE}
        </SortButton>
      </Toolbar>

      {filtered.length > 0 && (
        <CountLabel>
          {visibleCustomers.length} / {filtered.length} {MESSAGES.CUSTOMERS}
        </CountLabel>
      )}

      <ColumnHeader>
        <ColLabel>#</ColLabel>
        <ColLabel>{MESSAGES.CUSTOMER}</ColLabel>
        <ColLabel>{MESSAGES.POINTS}</ColLabel>
      </ColumnHeader>

      <StackList>
        {visibleCustomers.length === 0 ? (
          <EmptyState>{MESSAGES.NO_CUSTOMERS_FOUND}</EmptyState>
        ) : (
          visibleCustomers.map((customer, index) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              selected={selected === customer.id}
              index={index}
              onClick={() => handleSelect(customer.id)}
            />
          ))
        )}
      </StackList>

      {hasMoreCustomersToLoad && (
        <Sentinel ref={sentinelRef}>{loading && <Spinner />}</Sentinel>
      )}
    </>
  );
};

CustomerGrid.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
};

export default CustomerGrid;
