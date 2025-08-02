
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Package, CreditCard, User, MapPin, Phone, Mail } from "lucide-react";

interface OrderWithItems {
  id: string;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  status: string;
  payment_method: string;
  coupon_code: string | null;
  customer_note: string | null;
  created_at: string;
  order_items: {
    id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    services: {
      name: string;
      description: string;
      category: string;
    };
  }[];
}

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string | null;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // First get customer ID by email
        const { data: customerData, error: customerError } = await supabase
          .from('customers')
          .select('id')
          .eq('email', user.email)
          .maybeSingle();

        if (customerError) {
          console.error('Error fetching customer:', customerError);
          setOrdersLoading(false);
          return;
        }

        // If no customer found, user hasn't placed any orders yet
        if (!customerData) {
          setOrders([]);
          setOrdersLoading(false);
          return;
        }

        // Fetch orders using customer_id
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              id,
              quantity,
              unit_price,
              total_price,
              services (
                name,
                description,
                category
              )
            )
          `)
          .eq('customer_id', customerData.id)
          .order('created_at', { ascending: false });

        if (ordersError) {
          console.error('Error fetching orders:', ordersError);
        } else {
          setOrders(ordersData || []);
        }

        // Fetch customer profile
        const { data: profileData, error: profileError } = await supabase
          .from('customers')
          .select('*')
          .eq('email', user.email)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
        } else {
          setProfile(profileData);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setOrdersLoading(false);
        setProfileLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading || ordersLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.final_amount.toString()), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your profile and track your service orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profile ? (
                <>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">{profile.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{profile.phone}</span>
                  </div>
                  {profile.address && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-sm">{profile.address}</span>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm">Profile information not available</p>
              )}
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-green-600">₹{totalSpent.toFixed(2)}</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Orders Section */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>Track and manage your service orders</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-600 mb-4">You haven't placed any orders yet. Start by browsing our services!</p>
                <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                        <div>
                          <h4 className="font-semibold text-base sm:text-lg">Order #{order.id.slice(-8)}</h4>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      {/* Order Items */}
                      <div className="mb-4">
                        <h5 className="font-medium mb-2 text-sm sm:text-base">Services Ordered:</h5>
                        <div className="space-y-2">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 bg-gray-50 rounded-lg space-y-1 sm:space-y-0">
                              <div className="flex-1">
                                <p className="font-medium text-sm sm:text-base">{item.services.name}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{item.services.category}</p>
                                <p className="text-xs sm:text-sm text-gray-500">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-left sm:text-right">
                                <p className="font-semibold text-sm sm:text-base">₹{item.total_price}</p>
                                <p className="text-xs sm:text-sm text-gray-600">₹{item.unit_price} each</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="border-t pt-4">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹{order.total_amount}</span>
                          </div>
                          {order.discount_amount && order.discount_amount > 0 && (
                            <div className="flex justify-between text-green-600">
                              <span>Discount:</span>
                              <span>-₹{order.discount_amount}</span>
                            </div>
                          )}
                          <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-2">
                            <span>Total:</span>
                            <span>₹{order.final_amount}</span>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm space-y-2 sm:space-y-0">
                          <div className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                            <span className="text-gray-600">Payment: </span>
                            <span className="ml-1 capitalize">{order.payment_method.replace('_', ' ')}</span>
                          </div>
                          {order.coupon_code && (
                            <Badge variant="outline" className="text-xs w-fit">
                              Coupon: {order.coupon_code}
                            </Badge>
                          )}
                        </div>

                        {order.customer_note && (
                          <div className="mt-4 bg-blue-50 p-2 sm:p-3 rounded-lg">
                            <p className="text-xs sm:text-sm font-medium text-blue-900 mb-1">Customer Note:</p>
                            <p className="text-xs sm:text-sm text-blue-800">{order.customer_note}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
