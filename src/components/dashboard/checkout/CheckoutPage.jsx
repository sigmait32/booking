// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Spinner, ToastContainer } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import { clearCart } from '../../../store/features/cart/cartSlice';
// import { useCheckoutMutation } from '../../../store/features/cart/cartApi';
// import CustomerFormSection from './CustomerFormSection';
// import OrderSummarySection from './OrderSummarySection';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//     const dispatch = useDispatch();
//     const cartItems = useSelector(state => state.cart.items);
//     const userInfo = useSelector(state => state.auth.userInfo);
//     const [checkout, { isLoading }] = useCheckoutMutation();

//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         customerId: '',
//         fullName: '',
//         email: '',
//         mobileNo: '',
//         address: '',
//         city: '',
//         state: '',
//         payment: 'credit',
//         password: '',
//         gst_number: ''
//     });

//     const calculateTotal = () => {
//         return cartItems.reduce(
//             (total, item) => total + item.price * item.quantity, 0
//         ).toFixed(2);
//     };

//     const placeOrder = async (e) => {
//         e.preventDefault();

//         if (!formData?.customerId) {
//             toast.warning("Please save customer details first.");
//             return;
//         }

//         try {
//             const orderData = {
//                 employeeId: userInfo?.id || "N/A",
//                 customerId: formData.customerId,
//                 items: cartItems?.length ? cartItems : [],
//                 shippingInfo: formData,
//                 total: calculateTotal(),
//             };

//             const response = await checkout(orderData).unwrap();
//             console.log("response is ======>", response)

//             if (response?.success) {
//                 toast.success(response.message || "Order placed successfully!", {
//                     position: "top-center",
//                     autoClose: 3000,
//                 });

//                 setTimeout(() => {
//                     const orderId = response?.order?.orderId;
//                     if (orderId) {
//                         navigate(`/dashboard/order-complete/${orderId}`);
//                     }
//                 }, 500);

//                 // dispatch(clearCart());
//             }
//         } catch (err) {
//             toast.error(err?.data?.message || "Order could not be placed.");
//         }
//     };



//     return (
//         <Container className="my-5">
//             <ToastContainer />
//             <Row>
//                 <Col md={7} className="pe-md-4">
//                     <CustomerFormSection
//                         formData={formData}
//                         setFormData={setFormData}
//                         calculateTotal={calculateTotal}
//                     />
//                 </Col>

//                 <Col md={5}>
//                     <OrderSummarySection
//                         formData={formData}
//                         isLoading={isLoading}
//                         placeOrder={placeOrder}
//                         calculateTotal={calculateTotal}
//                     />
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default CheckoutPage;

import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../../store/features/cart/cartSlice';
import { useCheckoutMutation } from '../../../store/features/cart/cartApi';
import CustomerFormSection from './CustomerFormSection';
import OrderSummarySection from './OrderSummarySection';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.items);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [checkout, { isLoading }] = useCheckoutMutation();

    const [formData, setFormData] = useState({
        customerId: '',
        fullName: '',
        email: '',
        mobileNo: '',
        address: '',
        city: '',
        state: '',
        payment: 'credit',
        password: '',
        gst_number: ''
    });

    // Memoized calculations
    const subtotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    const discount = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            const itemTotal = item.price * item.quantity;
            const itemDiscount = itemTotal * (item.maxDiscount || 0) / 100;
            return sum + itemDiscount;
        }, 0);
    }, [cartItems]);

    const shippingFee = useMemo(() => {
        return cartItems.reduce((sum, item) => {
            if (item.shipping && !item.shipping.isFreeShipping) {
                return sum + (item.shipping.cost || 0) * item.quantity;
            }
            return sum;
        }, 0);
    }, [cartItems]);

    const totalGST = useMemo(() => {
        return cartItems.reduce((total, item) => {
            const gstAmount = (item.price * item.quantity * 18) / 100;
            return total + gstAmount;
        }, 0);
    }, [cartItems]);

    const total = useMemo(() => {
        return subtotal - discount + shippingFee + totalGST;
    }, [subtotal, discount, shippingFee, totalGST]);

    const calculateTotal = () => total.toFixed(2);

    const validateForm = () => {
        const requiredFields = ['customerId', 'fullName', 'mobileNo', 'address'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                toast.warning(`Please fill out the ${field} field.`);
                return false;
            }
        }
        return true;
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const orderData = {
            employeeId: userInfo?.id || "N/A",
            customerId: formData.customerId,
            items: cartItems,
            shippingInfo: formData,
            discount,
            shipping: shippingFee,
            tax: totalGST,
            totalBeforeDiscount: subtotal,
            totalAfterDiscount: total,
            total,
        };

        try {

            console.log("orderData is =========>", orderData)
            const response = await checkout(orderData).unwrap();

            if (response?.success) {
                toast.success(response.message || "Order placed successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                });

                // dispatch(clearCart());

                setTimeout(() => {
                    const orderId = response?.order?.orderId;
                    if (orderId) {
                        navigate(`/dashboard/order-complete/${orderId}`);
                    }
                }, 500);
                // dispatch(clearCart());
            }
        } catch (err) {
            toast.error(err?.data?.message || "Order could not be placed.");
        }
    };

    return (
        <Container className="my-5">
            <ToastContainer />
            <Row>
                <Col md={7} className="pe-md-4">
                    <CustomerFormSection
                        formData={formData}
                        setFormData={setFormData}
                        calculateTotal={calculateTotal}
                    />
                </Col>

                <Col md={5}>
                    <OrderSummarySection
                        shippingFee={shippingFee}
                        subtotal={subtotal}
                        total={total}
                        totalGST={totalGST}
                        discount={discount}
                        formData={formData}
                        isLoading={isLoading}
                        placeOrder={placeOrder}
                        calculateTotal={calculateTotal}
                    />

                    {isLoading && (
                        <div className="text-center my-4">
                            <Spinner animation="border" variant="primary" />
                            <p>Placing your order...</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CheckoutPage;
