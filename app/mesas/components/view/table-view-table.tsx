'use client';

import { Loader } from 'lucide-react';

import OrderStatusSelect from '@/components/order-status-select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import { useTableContext } from '../../contexts/table-context';
import { useQueryTableOrders } from '../../hooks/use-query-table-orders';

export default function TableViewTable() {
    const { tableView } = useTableContext();

    const {
        data: orders = [],
        isFetching,
        failureCount
    } = useQueryTableOrders({
        id: tableView?.id as string
    });

    if (!tableView) return;

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Pedidos</p>

            <div className="rounded-xl border">
                <Table>
                    <TableHeader className="">
                        <TableRow>
                            <TableHead>Produto</TableHead>

                            <TableHead className="text-right">
                                Quantidade
                            </TableHead>

                            <TableHead>Cliente</TableHead>

                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {orders.length > 0 &&
                            orders.flat().map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {order.product.name}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {order.product.quantity} un
                                    </TableCell>

                                    <TableCell>{order.clientName}</TableCell>

                                    <TableCell>
                                        <OrderStatusSelect order={order} />
                                    </TableCell>
                                </TableRow>
                            ))}

                        {orders.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-16 text-center"
                                >
                                    {isFetching && !failureCount ? (
                                        <Loader className="mx-auto animate-spin" />
                                    ) : (
                                        'Sem registros'
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
