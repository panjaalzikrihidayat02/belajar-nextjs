import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/font";
import { fetchCardData } from "../../lib/data";
import { Suspense } from 'react';
import { RevenueChartSkeleton, CardsSkeleton, LatestInvoicesSkeleton, InvoicesTableSkeleton } from '@/app/ui/skeletons';
import CardWrapper from "@/app/ui/dashboard/cards";
import Table from '@/app/ui/invoices/table';

export default async function Page(props: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // Default value untuk searchParams
  const searchParams = props.searchParams || {};
  const query = await searchParams.query || '';
  const currentPage = Number(searchParams.page) || 1;

  // Fetch data untuk card
  let cardData;
  try {
    cardData = await fetchCardData();
  } catch (error) {
    console.error("Failed to fetch card data:", error);
    // Fallback values jika fetch gagal
    cardData = {
      totalPaidInvoices: 0,
      totalPendingInvoices: 0,
      numberOfInvoices: 0,
      numberOfCustomers: 0,
    };
  }

  const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers } = cardData;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}