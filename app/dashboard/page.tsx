"use client";

import { useState } from "react";
import Link from "next/link";

type Order = {
  party: string;
  mobile: string;
  district: string;
  amount: number;
  paper: number;
  plate: number;
  binding: number;
  delivery: number;
  designer: number;
  marketing: number;
  others: number;
  profit: number;
};

type Week = {
  id: number;
  start: string;
  end: string;
  orders: Order[];
};

const weeks: Week[] = [
  {
    id: 1,
    start: "15 Aug",
    end: "20 Aug",
    orders: [
      {
        party: "ABC Publications",
        mobile: "01711111111",
        district: "Dhaka",
        amount: 12500,
        paper: 5200,
        plate: 600,
        binding: 900,
        delivery: 300,
        designer: 360,
        marketing: 250,
        others: 100,
        profit: 4790,
      },
      {
        party: "Rahman Traders",
        mobile: "01822222222",
        district: "Bogura",
        amount: 8200,
        paper: 3100,
        plate: 400,
        binding: 600,
        delivery: 200,
        designer: 360,
        marketing: 250,
        others: 50,
        profit: 3240,
      },
      {
        party: "City Books",
        mobile: "01933333333",
        district: "Rajshahi",
        amount: 15600,
        paper: 6800,
        plate: 700,
        binding: 1100,
        delivery: 400,
        designer: 360,
        marketing: 250,
        others: 150,
        profit: 5840,
      },
    ],
  },

  {
    id: 2,
    start: "08 Aug",
    end: "13 Aug",
    orders: [
      {
        party: "Modern Press",
        mobile: "01744444444",
        district: "Dhaka",
        amount: 10500,
        paper: 4300,
        plate: 500,
        binding: 700,
        delivery: 300,
        designer: 350,
        marketing: 250,
        others: 100,
        profit: 4000,
      },
      {
        party: "Safa Enterprise",
        mobile: "01855555555",
        district: "Narayanganj",
        amount: 9200,
        paper: 3600,
        plate: 450,
        binding: 650,
        delivery: 250,
        designer: 350,
        marketing: 250,
        others: 80,
        profit: 3570,
      },
      {
        party: "Nahar Books",
        mobile: "01966666666",
        district: "Chattogram",
        amount: 13800,
        paper: 5900,
        plate: 650,
        binding: 900,
        delivery: 350,
        designer: 350,
        marketing: 250,
        others: 120,
        profit: 5280,
      },
      {
        party: "Alif Traders",
        mobile: "01677777777",
        district: "Rangpur",
        amount: 7600,
        paper: 2900,
        plate: 350,
        binding: 500,
        delivery: 200,
        designer: 350,
        marketing: 250,
        others: 50,
        profit: 3000,
      },
    ],
  },

  {
    id: 3,
    start: "01 Aug",
    end: "06 Aug",
    orders: [
      {
        party: "Star Publications",
        mobile: "01788888888",
        district: "Rajshahi",
        amount: 11800,
        paper: 4700,
        plate: 550,
        binding: 800,
        delivery: 300,
        designer: 300,
        marketing: 220,
        others: 100,
        profit: 4830,
      },
      {
        party: "Mitali Press",
        mobile: "01899999999",
        district: "Bogura",
        amount: 9800,
        paper: 3900,
        plate: 450,
        binding: 650,
        delivery: 250,
        designer: 300,
        marketing: 220,
        others: 80,
        profit: 3950,
      },
      {
        party: "Bismillah Enterprise",
        mobile: "01910101010",
        district: "Dhaka",
        amount: 14200,
        paper: 6100,
        plate: 650,
        binding: 950,
        delivery: 350,
        designer: 300,
        marketing: 220,
        others: 120,
        profit: 5490,
      },
    ],
  },

  {
    id: 4,
    start: "25 Jul",
    end: "30 Jul",
    orders: [
      {
        party: "New Vision",
        mobile: "01612121212",
        district: "Khulna",
        amount: 8900,
        paper: 3400,
        plate: 400,
        binding: 600,
        delivery: 200,
        designer: 300,
        marketing: 200,
        others: 80,
        profit: 3720,
      },
      {
        party: "S M Traders",
        mobile: "01713131313",
        district: "Sylhet",
        amount: 12100,
        paper: 5000,
        plate: 550,
        binding: 800,
        delivery: 300,
        designer: 300,
        marketing: 200,
        others: 100,
        profit: 4850,
      },
    ],
  },
];

/* ================================================= */
/* WEEK COLORS */
/* ================================================= */

const weekColors = [
  {
    header: "bg-indigo-600",
    headerText: "text-white",
    subText: "text-indigo-100",
    badge: "bg-white/20 text-white",
    arrow: "bg-white/20 text-white",
  },
  {
    header: "bg-violet-600",
    headerText: "text-white",
    subText: "text-violet-100",
    badge: "bg-white/20 text-white",
    arrow: "bg-white/20 text-white",
  },
  {
    header: "bg-sky-600",
    headerText: "text-white",
    subText: "text-sky-100",
    badge: "bg-white/20 text-white",
    arrow: "bg-white/20 text-white",
  },
  {
    header: "bg-emerald-600",
    headerText: "text-white",
    subText: "text-emerald-100",
    badge: "bg-white/20 text-white",
    arrow: "bg-white/20 text-white",
  },
];

/* ================================================= */
/* MONEY FORMAT */
/* ================================================= */

function money(value: number) {
  return `৳${value.toLocaleString("en-BD")}`;
}

/* ================================================= */
/* WEEK TOTAL */
/* ================================================= */

function getWeekTotal(week: Week, key: keyof Order) {
  return week.orders.reduce((sum, order) => {
    return sum + Number(order[key] || 0);
  }, 0);
}

/* ================================================= */
/* WEEK EXPENSE */
/* ================================================= */

function getWeekExpense(week: Week) {
  return week.orders.reduce((sum, order) => {
    return (
      sum +
      order.paper +
      order.plate +
      order.binding +
      order.delivery +
      order.designer +
      order.marketing +
      order.others
    );
  }, 0);
}

/* ================================================= */
/* WEEK PROFIT */
/* ================================================= */

function getWeekProfit(week: Week) {
  return getWeekTotal(week, "profit");
}

/* ================================================= */
/* DASHBOARD */
/* ================================================= */

export default function DashboardPage() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  /* ================================================= */
  /* ALL ORDERS */
  /* ================================================= */

  const allOrders = weeks.flatMap((week) => week.orders);

  /* ================================================= */
  /* TOTAL SALES */
  /* ================================================= */

  const totalSale = allOrders.reduce(
    (sum, order) => sum + order.amount,
    0
  );

  /* ================================================= */
  /* TOTAL PROFIT */
  /* ================================================= */

  const totalProfit = allOrders.reduce(
    (sum, order) => sum + order.profit,
    0
  );

  /* ================================================= */
  /* TOTAL EXPENSE */
  /* ================================================= */

  const totalExpense = totalSale - totalProfit;

  /* ================================================= */
  /* AVERAGE ORDER */
  /* ================================================= */

  const averageOrder =
    allOrders.length > 0
      ? totalSale / allOrders.length
      : 0;

  /* ================================================= */
  /* PROFIT MARGIN */
  /* ================================================= */

  const profitMargin =
    totalSale > 0
      ? (totalProfit / totalSale) * 100
      : 0;

  /* ================================================= */
  /* UI */
  /* ================================================= */

  return (
    <main className="min-h-screen bg-[#f4f7fb]">

      <div className="mx-auto min-h-screen w-full max-w-3xl bg-[#f4f7fb]">

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 px-3 py-3 backdrop-blur">

          <div className="relative mx-auto flex max-w-3xl items-center justify-between">

            {/* LEFT */}

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


            {/* RIGHT */}

            <Link
              href="/"
              className="ml-auto rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-[10px] font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95 sm:px-3.5 sm:text-xs"
            >
              Hisab
            </Link>

          </div>

        </header>


        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="px-4 pb-8 pt-5">

          {/* ================================================= */}
          {/* TITLE */}
          {/* ================================================= */}

          <div className="mb-4">

            <h2 className="text-xl font-bold text-slate-900">
              Dashboard
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your press business performance
            </p>

          </div>


          {/* ================================================= */}
          {/* SUMMARY CARDS */}
          {/* ================================================= */}

          <section className="grid grid-cols-2 gap-3">

            {/* TOTAL SALES */}

            <div className="rounded-2xl bg-indigo-600 p-4 text-white shadow-sm">

              <p className="text-xs font-medium text-indigo-100">
                TOTAL SALES
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {money(totalSale)}
              </h3>

              <p className="mt-1 text-xs text-indigo-200">
                {allOrders.length} orders
              </p>

            </div>


            {/* TOTAL PROFIT */}

            <div className="rounded-2xl bg-emerald-500 p-4 text-white shadow-sm">

              <p className="text-xs font-medium text-emerald-100">
                TOTAL PROFIT
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {money(totalProfit)}
              </h3>

              <p className="mt-1 text-xs text-emerald-100">
                {profitMargin.toFixed(1)}% margin
              </p>

            </div>


            {/* TOTAL EXPENSE */}

            <div className="rounded-2xl bg-white p-4 shadow-sm">

              <p className="text-xs font-medium text-slate-500">
                TOTAL EXPENSE
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {money(totalExpense)}
              </h3>

            </div>


            {/* AVERAGE ORDER */}

            <div className="rounded-2xl bg-white p-4 shadow-sm">

              <p className="text-xs font-medium text-slate-500">
                AVG. ORDER
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {money(Math.round(averageOrder))}
              </h3>

            </div>

          </section>


          {/* ================================================= */}
          {/* OVERALL PERFORMANCE */}
          {/* ================================================= */}

          <section className="mt-4 rounded-2xl bg-white p-4 shadow-sm">

            <div className="mb-3">

              <h3 className="text-base font-bold text-slate-900">
                Overall Performance
              </h3>

              <p className="text-xs text-slate-500">
                Last {weeks.length} weeks
              </p>

            </div>


            <div className="space-y-3">

              {/* PROFIT */}

              <div>

                <div className="mb-1 flex justify-between text-xs">

                  <span className="text-slate-500">
                    Profit
                  </span>

                  <span className="font-semibold text-emerald-600">
                    {money(totalProfit)}
                  </span>

                </div>


                <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${Math.min(
                        profitMargin,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>


              {/* EXPENSE */}

              <div>

                <div className="mb-1 flex justify-between text-xs">

                  <span className="text-slate-500">
                    Expenses
                  </span>

                  <span className="font-semibold text-rose-500">
                    {money(totalExpense)}
                  </span>

                </div>


                <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-rose-400"
                    style={{
                      width: `${Math.min(
                        (totalExpense / totalSale) * 100,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </section>


          {/* ================================================= */}
          {/* PREVIOUS WEEKS */}
          {/* ================================================= */}

          <section className="mt-5">

            <div className="mb-3">

              <h3 className="text-lg font-bold text-slate-900">
                Previous Weeks
              </h3>

              <p className="text-xs text-slate-500">
                Tap a week to view order details
              </p>

            </div>


            {/* ================================================= */}
            {/* WEEK LIST */}
            {/* ================================================= */}

            <div className="space-y-3">

              {weeks.map((week, index) => {

                const sale = getWeekTotal(
                  week,
                  "amount"
                );

                const profit =
                  getWeekProfit(week);

                const expense =
                  getWeekExpense(week);

                const isExpanded =
                  expandedWeek === week.id;

                const color =
                  weekColors[
                  index % weekColors.length
                  ];

                return (

                  <div
                    key={week.id}
                    className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60"
                  >

                    {/* ================================================= */}
                    {/* CLICKABLE WEEK HEADER */}
                    {/* ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedWeek(
                          isExpanded
                            ? null
                            : week.id
                        )
                      }
                      className="w-full text-left"
                    >

                      <div
                        className={`flex items-center justify-between px-4 py-3 ${color.header}`}
                      >

                        {/* LEFT */}

                        <div className="min-w-0">

                          <div className="flex items-center gap-2">

                            <h4
                              className={`font-bold ${color.headerText}`}
                            >
                              {week.start} - {week.end}
                            </h4>

                            {index === 0 && (

                              <span
                                className={`rounded-full px-2 py-1 text-[10px] font-bold ${color.badge}`}
                              >
                                Current
                              </span>

                            )}

                          </div>


                          <p
                            className={`mt-1 text-xs ${color.subText}`}
                          >
                            Saturday - Thursday ·{" "}
                            {week.orders.length} orders
                          </p>

                        </div>


                        {/* RIGHT */}

                        <div className="flex shrink-0 items-center gap-3">

                          <div className="text-right">

                            <p
                              className={`text-[10px] ${color.subText}`}
                            >
                              Profit
                            </p>

                            <p
                              className={`text-sm font-bold ${color.headerText}`}
                            >
                              {money(profit)}
                            </p>

                          </div>


                          {/* ARROW */}

                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-200 ${color.arrow} ${isExpanded
                              ? "rotate-180"
                              : ""
                              }`}
                          >
                            ↓
                          </div>

                        </div>

                      </div>

                    </button>


                    {/* ================================================= */}
                    {/* WEEK SUMMARY */}
                    {/* ================================================= */}

                    <div className="grid grid-cols-3 border-t border-slate-100">

                      {/* SALES */}

                      <div className="px-3 py-3 text-center">

                        <p className="text-[10px] uppercase text-slate-400">
                          Sales
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {money(sale)}
                        </p>

                      </div>


                      {/* EXPENSE */}

                      <div className="border-x border-slate-100 px-3 py-3 text-center">

                        <p className="text-[10px] uppercase text-slate-400">
                          Expense
                        </p>

                        <p className="mt-1 text-sm font-bold text-rose-500">
                          {money(expense)}
                        </p>

                      </div>


                      {/* ORDERS */}

                      <div className="px-3 py-3 text-center">

                        <p className="text-[10px] uppercase text-slate-400">
                          Orders
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {week.orders.length}
                        </p>

                      </div>

                    </div>


                    {/* ================================================= */}
                    {/* ORDER DETAILS */}
                    {/* ================================================= */}

                    {isExpanded && (

                      <div className="border-t border-slate-100 px-3 py-3">

                        <p className="mb-2 px-1 text-xs font-bold text-slate-500">
                          ORDER DETAILS
                        </p>


                        <div className="space-y-2">

                          {week.orders.map(
                            (
                              order,
                              orderIndex
                            ) => (

                              <div
                                key={orderIndex}
                                className="rounded-xl bg-slate-50 p-3"
                              >

                                {/* ORDER TOP */}

                                <div className="flex items-start justify-between gap-3">

                                  <div className="min-w-0">

                                    <p className="truncate text-sm font-bold text-slate-800">
                                      {order.party}
                                    </p>


                                    {/* MOBILE */}

                                    <p className="mt-1 text-[11px] text-slate-500">
                                      📱 {order.mobile}
                                    </p>


                                    {/* DISTRICT */}

                                    <p className="mt-0.5 text-[11px] text-slate-500">
                                      📍 {order.district}
                                    </p>


                                    <p className="mt-1 text-[11px] text-slate-400">
                                      Order #
                                      {orderIndex + 1}
                                    </p>

                                  </div>


                                  <div className="shrink-0 text-right">

                                    <p className="text-sm font-bold text-slate-900">
                                      {money(
                                        order.amount
                                      )}
                                    </p>

                                    <p className="mt-1 text-[11px] font-semibold text-emerald-600">
                                      +
                                      {money(
                                        order.profit
                                      )}
                                    </p>

                                  </div>

                                </div>


                                {/* COST BREAKDOWN */}

                                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-slate-200 pt-2">

                                  <CostItem
                                    label="Paper"
                                    value={
                                      order.paper
                                    }
                                  />

                                  <CostItem
                                    label="Plate"
                                    value={
                                      order.plate
                                    }
                                  />

                                  <CostItem
                                    label="Binding"
                                    value={
                                      order.binding
                                    }
                                  />

                                  <CostItem
                                    label="Delivery"
                                    value={
                                      order.delivery
                                    }
                                  />

                                  <CostItem
                                    label="Designer"
                                    value={
                                      order.designer
                                    }
                                  />

                                  <CostItem
                                    label="Marketing"
                                    value={
                                      order.marketing
                                    }
                                  />

                                  <CostItem
                                    label="Others"
                                    value={
                                      order.others
                                    }
                                  />


                                  {/* NET PROFIT */}

                                  <div className="flex justify-between text-[11px] font-bold">

                                    <span className="text-slate-500">
                                      Net Profit
                                    </span>

                                    <span className="text-emerald-600">
                                      {money(
                                        order.profit
                                      )}
                                    </span>

                                  </div>

                                </div>

                              </div>

                            )
                          )}

                        </div>

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          </section>


          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <div className="py-6 text-center">

            <p className="text-[11px] text-slate-400">
              Press Hisab · Weekly Accounts
            </p>

          </div>

        </div>

      </div>

    </main>
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
    <div className="flex justify-between text-[11px]">

      <span className="text-slate-400">
        {label}
      </span>

      <span className="font-medium text-slate-600">
        {money(value)}
      </span>

    </div>
  );
}