'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Box, Paper, Typography } from '@mui/material';

import OrderModal from '@/app/(pedidos)/components/order-modal';
import { TOrder } from '@/types';

type TOrderCard = {
    order: TOrder;
};

export default function OrderCard({ order }: TOrderCard) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // const drag = useDrag(() => ({
    //     item: order,
    //     type: 'TOrder',
    //     collect: (monitor) => ({ isDragging: Boolean(monitor.isDragging) })
    // }))[1];

    return (
        <>
            <OrderModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                order={order}
            />

            <Paper
                elevation={2}
                onClick={() => setIsModalOpen(true)}
                sx={{
                    backgroundColor: 'secondary.main',
                    height: 180,
                    width: 290,
                    boxShadow: '0px 7px 0px 0px #000',
                    borderRadius: '30px',
                    border: '2px solid #000',
                    cursor: 'pointer'
                }}
            >
                <Box
                    sx={{
                        width: 286,
                        height: 90,
                        position: 'relative'
                    }}
                >
                    <Image
                        src="https://www.vaipormim.com/storage/posts/files/d703f0eec8ddd82afb907dafa11d1c0c7028f9de.webp"
                        alt="kk"
                        unoptimized
                        fill
                        style={{
                            borderTopLeftRadius: '28px',
                            borderTopRightRadius: '28px'
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        borderTop: '2px solid #000',
                        display: 'flex',
                        height: 90,
                        flexDirection: 'column',
                        paddingLeft: 1.5,
                        paddingRight: 1.5,
                        justifyContent: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            color: '#fff',
                            fontSize: '20px',
                            fontWeight: 600
                        }}
                    >
                        {order.product.name}
                    </Typography>
                    <Typography sx={{ fontSize: '16px', color: '#fff' }}>
                        Mesa {order.tableNum}
                    </Typography>
                </Box>
            </Paper>
        </>
    );
}
