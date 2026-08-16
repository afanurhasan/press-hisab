"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Order = {
  id: number;
  partyName: string;
  orderAmount: number;
  paperCost: number;
  plateCost: number;
  bindingCost: number;
  deliveryCost: number;
};

type WeekData = {
  designerBudget: string;
  marketingBudget: string;
  othersBudget: string;
  orders: Order[];
};

const STORAGE_KEY = "press-hisab-data";

/* ================================================= */
/* WEEK FUNCTIONS */
/* ================================================= */

function getWeekStart(date: Date) {
  const result = new Date(date);

  const day = result.getDay();

  // Saturday = 0
  const daysFromSaturday = (day + 1) % 7;

  result.setDate(result.getDate() - daysFromSaturday);

  result.setHours(0, 0, 0, 0);

  return result;
}

function getWeekKey(date: Date) {
  const weekStart = getWeekStart(date);

  return `${weekStart.getFullYear()}-${String(
    weekStart.getMonth() + 1
  ).padStart(2, "0")}-${String(
    weekStart.getDate()
  ).padStart(2, "0")}`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

/* ================================================= */
/* MAIN PAGE */
/* ================================================= */

export default function Home() {
  const [mounted, setMounted] = useState(false);

  const [weekKey, setWeekKey] = useState("");

  const [weekData, setWeekData] = useState<WeekData>({
    designerBudget: "",
    marketingBudget: "",
    othersBudget: "",
    orders: [],
  });

  /* ================================================= */
  /* ORDER MODAL */
  /* ================================================= */

  const [showOrderModal, setShowOrderModal] = useState(false);

  const [editingOrderId, setEditingOrderId] = useState<number | null>(
    null
  );

  /* ================================================= */
  /* DELETE MODAL */
  /* ================================================= */

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteOrderId, setDeleteOrderId] = useState<number | null>(
    null
  );

  const [deleteOrderName, setDeleteOrderName] = useState("");

  /* ================================================= */
  /* FORM STATES */
  /* ================================================= */

  const [partyName, setPartyName] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [paperCost, setPaperCost] = useState("");
  const [plateCost, setPlateCost] = useState("");
  const [bindingCost, setBindingCost] = useState("");
  const [deliveryCost, setDeliveryCost] = useState("");

  /* ================================================= */
  /* LOAD DATA */
  /* ================================================= */

  useEffect(() => {
    const today = new Date();

    const currentWeekKey = getWeekKey(today);

    setWeekKey(currentWeekKey);

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      try {
        const allWeeks = JSON.parse(savedData);

        if (allWeeks[currentWeekKey]) {
          setWeekData(allWeeks[currentWeekKey]);
        }
      } catch {
        console.log("Could not load saved data.");
      }
    }

    setMounted(true);
  }, []);

  /* ================================================= */
  /* SAVE DATA */
  /* ================================================= */

  useEffect(() => {
    if (!mounted || !weekKey) return;

    const savedData = localStorage.getItem(STORAGE_KEY);

    let allWeeks: Record<string, WeekData> = {};

    if (savedData) {
      try {
        allWeeks = JSON.parse(savedData);
      } catch {
        allWeeks = {};
      }
    }

    allWeeks[weekKey] = weekData;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(allWeeks)
    );
  }, [weekData, weekKey, mounted]);

  /* ================================================= */
  /* CURRENT WEEK */
  /* ================================================= */

  const weekStart = weekKey
    ? getWeekStart(new Date(`${weekKey}T00:00:00`))
    : new Date();

  const weekEnd = new Date(weekStart);

  weekEnd.setDate(weekEnd.getDate() + 5);

  /* ================================================= */
  /* ORDERS */
  /* ================================================= */

  const orders = weekData.orders;

  const totalOrders = orders.length;

  /* ================================================= */
  /* WEEKLY BUDGET */
  /* ================================================= */

  const designerBudget =
    Number(weekData.designerBudget) || 0;

  const marketingBudget =
    Number(weekData.marketingBudget) || 0;

  const othersBudget =
    Number(weekData.othersBudget) || 0;

  /* ================================================= */
  /* PER ORDER AUTO COST */
  /* ================================================= */

  const designerCost =
    totalOrders > 0
      ? designerBudget / totalOrders
      : 0;

  const marketingCost =
    totalOrders > 0
      ? marketingBudget / totalOrders
      : 0;

  const othersCost =
    totalOrders > 0
      ? othersBudget / totalOrders
      : 0;

  /* ================================================= */
  /* ADD ORDER */
  /* ================================================= */

  const openAddOrder = () => {
    setEditingOrderId(null);

    setPartyName("");
    setOrderAmount("");
    setPaperCost("");
    setPlateCost("");
    setBindingCost("");
    setDeliveryCost("");

    setShowOrderModal(true);
  };

  /* ================================================= */
  /* EDIT ORDER */
  /* ================================================= */

  const openEditOrder = (order: Order) => {
    setEditingOrderId(order.id);

    setPartyName(order.partyName);
    setOrderAmount(String(order.orderAmount));
    setPaperCost(String(order.paperCost));
    setPlateCost(String(order.plateCost));
    setBindingCost(String(order.bindingCost));
    setDeliveryCost(String(order.deliveryCost));

    setShowOrderModal(true);
  };

  /* ================================================= */
  /* CLOSE ORDER MODAL */
  /* ================================================= */

  const closeOrderModal = () => {
    setShowOrderModal(false);

    setEditingOrderId(null);

    setPartyName("");
    setOrderAmount("");
    setPaperCost("");
    setPlateCost("");
    setBindingCost("");
    setDeliveryCost("");
  };

  /* ================================================= */
  /* SAVE / UPDATE ORDER */
  /* ================================================= */

  const saveOrder = () => {
    if (!partyName.trim()) {
      alert("Party name is required.");
      return;
    }

    if (!orderAmount) {
      alert("Order amount is required.");
      return;
    }

    const newOrder: Order = {
      id:
        editingOrderId !== null
          ? editingOrderId
          : Date.now(),

      partyName: partyName.trim(),

      orderAmount: Number(orderAmount),

      paperCost: Number(paperCost) || 0,

      plateCost: Number(plateCost) || 0,

      bindingCost: Number(bindingCost) || 0,

      deliveryCost: Number(deliveryCost) || 0,
    };

    setWeekData((previous) => ({
      ...previous,

      orders:
        editingOrderId !== null
          ? previous.orders.map((order) =>
            order.id === editingOrderId
              ? newOrder
              : order
          )
          : [...previous.orders, newOrder],
    }));

    closeOrderModal();
  };

  /* ================================================= */
  /* OPEN DELETE CONFIRMATION */
  /* ================================================= */

  const openDeleteConfirmation = (order: Order) => {
    setDeleteOrderId(order.id);

    setDeleteOrderName(order.partyName);

    setShowDeleteModal(true);
  };

  /* ================================================= */
  /* CANCEL DELETE */
  /* ================================================= */

  const cancelDelete = () => {
    setShowDeleteModal(false);

    setDeleteOrderId(null);

    setDeleteOrderName("");
  };

  /* ================================================= */
  /* DELETE ORDER */
  /* ================================================= */

  const confirmDeleteOrder = () => {
    if (deleteOrderId === null) return;

    setWeekData((previous) => ({
      ...previous,

      orders: previous.orders.filter(
        (order) => order.id !== deleteOrderId
      ),
    }));

    setShowDeleteModal(false);

    setDeleteOrderId(null);

    setDeleteOrderName("");
  };

  /* ================================================= */
  /* WEEKLY SUMMARY */
  /* ================================================= */

  const summary = useMemo(() => {
    let totalOrderAmount = 0;

    let totalPaperCost = 0;
    let totalPlateCost = 0;
    let totalBindingCost = 0;
    let totalDeliveryCost = 0;

    orders.forEach((order) => {
      totalOrderAmount += order.orderAmount;

      totalPaperCost += order.paperCost;

      totalPlateCost += order.plateCost;

      totalBindingCost += order.bindingCost;

      totalDeliveryCost += order.deliveryCost;
    });

    const totalDirectCost =
      totalPaperCost +
      totalPlateCost +
      totalBindingCost +
      totalDeliveryCost;

    const totalSharedCost =
      designerBudget +
      marketingBudget +
      othersBudget;

    const totalCost =
      totalDirectCost + totalSharedCost;

    const netProfit =
      totalOrderAmount - totalCost;

    return {
      totalOrderAmount,
      totalDirectCost,
      totalSharedCost,
      totalCost,
      netProfit,
    };
  }, [
    orders,
    designerBudget,
    marketingBudget,
    othersBudget,
  ]);

  /* ================================================= */
  /* LOADING */
  /* ================================================= */

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb]">

        <div className="text-center">

          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-slate-500">
            Loading Press Hisab...
          </p>

        </div>

      </main>
    );
  }

  /* ================================================= */
  /* PAGE */
  /* ================================================= */

  return (
    <main className="min-h-screen bg-[#f4f7fb]">

      {/* DASHBOARD SAME WIDTH */}

      <div className="mx-auto min-h-screen w-full max-w-3xl bg-[#f4f7fb]">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 px-3 py-3 backdrop-blur">
          <div className="relative mx-auto flex max-w-3xl items-center justify-between">

            {/* LEFT - LOGO */}
            <div className="flex min-w-0 items-center gap-2.5">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
                PH
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-sm font-bold text-slate-900">
                  Press Hisab
                </h1>

                
              </div>

            </div>


            {/* CENTER - ADD ORDER */}
            <button
              onClick={openAddOrder}
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-indigo-600 px-3 py-2 text-[10px] font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95 sm:px-4 sm:text-xs"
            >
              + Add Order
            </button>


            {/* RIGHT - DASHBOARD */}
            <Link
              href="/dashboard"
              className="ml-auto rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-[10px] font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95 sm:px-3.5 sm:text-xs"
            >
              Dashboard
            </Link>

          </div>
        </header>

        {/* ================================================= */}
        {/* CURRENT WEEK */}
        {/* ================================================= */}

        <section className="px-4 pt-4">

          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-5 text-white shadow-lg shadow-indigo-200">

            <div className="flex items-start justify-between gap-4">

              <div>

                <p className="text-[11px] font-semibold tracking-wide text-indigo-100">
                  CURRENT WEEK
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight">
                  {formatDate(weekStart)} -{" "}
                  {formatDate(weekEnd)}
                </h2>

                <p className="mt-1 text-xs text-indigo-100">
                  Saturday - Thursday
                </p>

              </div>

            

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* WEEKLY SUMMARY */}
        {/* ================================================= */}

        <section className="px-4 pt-4">

          <div className="rounded-2xl bg-slate-900 p-4 text-white shadow-lg">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Weekly Summary
                </p>

                <h2 className="mt-1 text-base font-bold">
                  This Week
                </h2>

              </div>

              <div className="rounded-xl bg-white/10 px-3 py-2 text-center">

                <p className="text-lg font-bold">
                  {totalOrders}
                </p>

                <p className="text-[9px] text-slate-400">
                  ORDERS
                </p>

              </div>

            </div>

            <div className="my-3 h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-3">

              <div>

                <p className="text-[10px] text-slate-400">
                  Total Sale
                </p>

                <p className="mt-1 text-sm font-bold">
                  ৳{summary.totalOrderAmount.toLocaleString()}
                </p>

              </div>

              <div>

                <p className="text-[10px] text-slate-400">
                  Total Cost
                </p>

                <p className="mt-1 text-sm font-bold text-red-300">
                  ৳{Math.round(
                    summary.totalCost
                  ).toLocaleString()}
                </p>

              </div>

            </div>

            <div className="mt-3 rounded-xl bg-emerald-500/10 px-3 py-3">

              <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
                Net Profit
              </p>

              <p
                className={`mt-0.5 text-2xl font-bold ${summary.netProfit >= 0
                    ? "text-emerald-400"
                    : "text-red-400"
                  }`}
              >
                ৳{Math.round(
                  summary.netProfit
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </section>

        {/* ================================================= */}
        {/* WEEKLY BUDGET */}
        {/* ================================================= */}

        <section className="px-4 pt-5">

          <div className="mb-3 flex items-center justify-between">

            <div>

              <h2 className="text-base font-bold text-slate-900">
                Weekly Budget
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Shared expenses are automatically divided
              </p>

            </div>

            <div className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[9px] font-bold text-indigo-600">
              AUTO SPLIT
            </div>

          </div>

          <div className="space-y-2.5">

            <BudgetInput
              label="Designer"
              value={weekData.designerBudget}
              onChange={(value) =>
                setWeekData((previous) => ({
                  ...previous,
                  designerBudget: value,
                }))
              }
              perOrder={designerCost}
            />

            <BudgetInput
              label="Marketing"
              value={weekData.marketingBudget}
              onChange={(value) =>
                setWeekData((previous) => ({
                  ...previous,
                  marketingBudget: value,
                }))
              }
              perOrder={marketingCost}
            />

            <BudgetInput
              label="Others"
              value={weekData.othersBudget}
              onChange={(value) =>
                setWeekData((previous) => ({
                  ...previous,
                  othersBudget: value,
                }))
              }
              perOrder={othersCost}
            />

          </div>

        </section>

        {/* ================================================= */}
        {/* ORDERS */}
        {/* ================================================= */}

        <section className="px-4 pb-8 pt-5">

          <div className="mb-3">

            <h2 className="text-base font-bold text-slate-900">
              Orders
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {totalOrders === 0
                ? "No orders added yet"
                : `${totalOrders} order${totalOrders > 1 ? "s" : ""
                } this week`}
            </p>

          </div>

          {/* ================================================= */}
          {/* CENTER ADD ORDER BUTTON */}
          {/* ================================================= */}

          <div className="mb-4 flex justify-center">

            <button
              onClick={openAddOrder}
              className="rounded-xl bg-indigo-600 px-7 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
            >
              + Add Order
            </button>

          </div>

          {/* ================================================= */}
          {/* EMPTY STATE */}
          {/* ================================================= */}

          {orders.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-9 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                🧾
              </div>

              <h3 className="mt-3 text-sm font-bold text-slate-800">
                No orders yet
              </h3>

              <p className="mx-auto mt-1 max-w-[240px] text-xs leading-5 text-slate-500">
                Tap the Add Order button above to enter your first press order.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {orders.map((order, index) => {

                /* ================================= */
                /* ORDER PROFIT */
                /* ================================= */

                const netProfit =
                  order.orderAmount -
                  order.paperCost -
                  order.plateCost -
                  order.bindingCost -
                  order.deliveryCost -
                  designerCost -
                  marketingCost -
                  othersCost;

                return (

                  <div
                    key={order.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >

                    {/* ================================= */}
                    {/* ORDER TOP */}
                    {/* ================================= */}

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        {/* NUMBER */}

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-500">
                          {index + 1}
                        </div>

                        {/* PARTY */}

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-slate-900">
                            {order.partyName}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Order Amount
                          </p>

                          <p className="text-sm font-bold text-slate-700">
                            ৳{order.orderAmount.toLocaleString()}
                          </p>

                        </div>

                      </div>

                      {/* ================================= */}
                      {/* ACTIONS + PROFIT */}
                      {/* ================================= */}

                      <div className="flex shrink-0 items-center gap-1.5">

                        {/* EDIT */}

                        <button
                          onClick={() =>
                            openEditOrder(order)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-slate-500 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 active:scale-90"
                          aria-label="Edit order"
                        >
                          ✎
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            openDeleteConfirmation(order)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-red-100 bg-red-50 text-sm text-red-500 transition hover:bg-red-100 active:scale-90"
                          aria-label="Delete order"
                        >
                          🗑
                        </button>

                        {/* PROFIT */}

                        <div className="rounded-xl bg-emerald-50 px-3 py-2 text-right">

                          <p className="text-[8px] font-semibold uppercase tracking-wide text-emerald-600">
                            Profit
                          </p>

                          <p
                            className={`text-sm font-bold ${netProfit >= 0
                                ? "text-emerald-600"
                                : "text-red-600"
                              }`}
                          >
                            ৳{Math.round(
                              netProfit
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* ================================= */}
                    {/* COST LIST */}
                    {/* ================================= */}

                    <div className="mt-4 grid grid-cols-2 gap-2">

                      <CostItem
                        label="Paper"
                        value={order.paperCost}
                      />

                      <CostItem
                        label="Plate"
                        value={order.plateCost}
                      />

                      <CostItem
                        label="Binding"
                        value={order.bindingCost}
                      />

                      <CostItem
                        label="Delivery"
                        value={order.deliveryCost}
                      />

                      <CostItem
                        label="Designer"
                        value={designerCost}
                      />

                      <CostItem
                        label="Marketing"
                        value={marketingCost}
                      />

                      <CostItem
                        label="Others"
                        value={othersCost}
                      />

                    </div>

                  </div>

                );
              })}

            </div>

          )}

        </section>

      </div>

      {/* ================================================= */}
      {/* ADD / EDIT ORDER MODAL */}
      {/* ================================================= */}

      {showOrderModal && (

        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget
            ) {
              closeOrderModal();
            }

          }}
        >

          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl">

            {/* HEADER */}

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  {editingOrderId !== null
                    ? "Edit Order"
                    : "New Order"}
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {editingOrderId !== null
                    ? "Update Order"
                    : "Add New Order"}
                </h3>

              </div>

              <button
                onClick={closeOrderModal}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500 transition active:scale-90"
              >
                ✕
              </button>

            </div>

            {/* FORM */}

            <div className="space-y-3">

              <FormInput
                label="Party Name"
                value={partyName}
                onChange={setPartyName}
                placeholder="e.g. ABC Traders"
                type="text"
              />

              <FormInput
                label="Order Amount"
                value={orderAmount}
                onChange={setOrderAmount}
                placeholder="Enter order amount"
                type="number"
              />

              <div className="grid grid-cols-2 gap-3">

                <FormInput
                  label="Paper Cost"
                  value={paperCost}
                  onChange={setPaperCost}
                  placeholder="Enter amount"
                  type="number"
                />

                <FormInput
                  label="Plate Cost"
                  value={plateCost}
                  onChange={setPlateCost}
                  placeholder="Enter amount"
                  type="number"
                />

                <FormInput
                  label="Binding Cost"
                  value={bindingCost}
                  onChange={setBindingCost}
                  placeholder="Enter amount"
                  type="number"
                />

                <FormInput
                  label="Delivery Cost"
                  value={deliveryCost}
                  onChange={setDeliveryCost}
                  placeholder="Enter amount"
                  type="number"
                />

              </div>

              {/* AUTO COST */}

              <div className="rounded-2xl bg-indigo-50 p-3">

                <div className="mb-2 flex items-center justify-between">

                  <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">
                    Auto Allocated Cost
                  </p>

                  <span className="rounded-full bg-white px-2 py-1 text-[8px] font-bold text-indigo-600">
                    WEEKLY BUDGET
                  </span>

                </div>

                <div className="grid grid-cols-3 gap-2 text-center">

                  <div>

                    <p className="text-[9px] text-slate-500">
                      Designer
                    </p>

                    <p className="mt-0.5 text-xs font-bold text-slate-800">
                      ৳{Math.round(
                        designerCost
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div>

                    <p className="text-[9px] text-slate-500">
                      Marketing
                    </p>

                    <p className="mt-0.5 text-xs font-bold text-slate-800">
                      ৳{Math.round(
                        marketingCost
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div>

                    <p className="text-[9px] text-slate-500">
                      Others
                    </p>

                    <p className="mt-0.5 text-xs font-bold text-slate-800">
                      ৳{Math.round(
                        othersCost
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>

              {/* SAVE */}

              <button
                onClick={saveOrder}
                className="mt-2 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]"
              >
                {editingOrderId !== null
                  ? "Update Order"
                  : "Save Order"}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ================================================= */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 px-5 backdrop-blur-[2px]">

          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">

            {/* ICON */}

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl">
              🗑
            </div>

            {/* TEXT */}

            <h3 className="mt-4 text-base font-bold text-slate-900">
              Delete this order?
            </h3>

            <p className="mt-1 text-sm leading-5 text-slate-500">

              Are you sure you want to delete{" "}

              <span className="font-semibold text-slate-700">
                {deleteOrderName}
              </span>

              ? This action cannot be undone.

            </p>

            {/* BUTTONS */}

            <div className="mt-5 grid grid-cols-2 gap-3">

              <button
                onClick={cancelDelete}
                className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteOrder}
                className="rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-700 active:scale-[0.98]"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

/* ================================================= */
/* BUDGET INPUT */
/* ================================================= */

function BudgetInput({
  label,
  value,
  onChange,
  perOrder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  perOrder: number;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm">

      <div className="mb-1.5 flex items-center justify-between">

        <label className="text-xs font-semibold text-slate-800">
          {label}
        </label>

        <span className="text-[9px] font-medium uppercase tracking-wide text-slate-400">
          Weekly
        </span>

      </div>

      <div className="relative">

        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
          ৳
        </span>

        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Enter amount"
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
        />

      </div>

      <div className="mt-1 flex items-center justify-between">

        <span className="text-[9px] text-slate-400">
          Per order
        </span>

        <span className="text-[10px] font-bold text-indigo-600">
          ৳{Math.round(
            perOrder
          ).toLocaleString()} / order
        </span>

      </div>

    </div>
  );
}

/* ================================================= */
/* FORM INPUT */
/* ================================================= */

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: string;
}) {
  return (
    <div>

      <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">
        {label}
      </label>

      <input
        type={type}
        inputMode={
          type === "number"
            ? "numeric"
            : undefined
        }
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
      />

    </div>
  );
}

/* ================================================= */
/* COST ITEM */
/* ================================================= */

function CostItem({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">

      <span className="text-[10px] text-slate-500">
        {label}
      </span>

      <span className="text-[11px] font-semibold text-slate-700">
        ৳{Math.round(
          value
        ).toLocaleString()}
      </span>

    </div>
  );
}