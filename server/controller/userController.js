const Services = require('../model/services')
const Order = require('../model/order');

const fetchData = async (req, res) => {
    try {
        const datas = await Services.find()
        return res.status(200).json({ message: "data fetch successfully", datas })

    } catch (error) {
        console.log(error);
    }
}

const orderDetails = async (req, res) => {
    try {
        const { data, detail } = req.body;
        const { name, email, phone, date, time } = detail;
        // console.log(name,email,phone,date,time
        // return res.status(200).json({message:"data fetch successfully",datas})

        const orderDetails = [];

        for (const category in data) {
            if (data.hasOwnProperty(category)) {
                const services = data[category].map(service => ({
                    orderServises: service.name,
                    price: service.price
                }));

                orderDetails.push({
                    serviceName: category,
                    subCategory: services
                });
            }
        }

        const total = orderDetails.reduce((acc, category) => {
            return acc + category.subCategory.reduce((categoryTotal, service) => {
                return categoryTotal + service.price;
            }, 0);
        }, 0);


        const newOrder = new Order({
            name, email, phone, date, time,
            orderDetails,
            total
        });

        await newOrder.save();

        return res.status(200).json({ message: 'order stored saccessfully' })

    } catch (error) {
        console.log(error);
    }
}

const fetchOrderDetails = async (req, res) => {
    try {
        const datas = await Order.find()
        return res.status(200).json({ message: "data fetch successfully", datas })

    } catch (error) {
        console.log(error);
    }
}

// const statusUpdate = async (req, res) => {
//     try {
//         console.log("gfadh");
//         const { orderId } = req.params;
//         const { status } = req.body;

//         const updatedOrder = await Order.findByIdAndUpdate(
//             orderId,
//             { status },
//             { new: true } 
//           );
      
//         //   res.json({ success: true, updatedOrder });
//           console.log("1",updatedOrder);
//         // return res.status(200).json({ message: "data fetch successfully", datas })

//     } catch (error) {
//         console.log(error);
//     }
// }

const statusUpdate = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      console.log('Updating order status. OrderId:', orderId, 'Status:', status);
  
      const updatedOrder = await Order.updateOne(
        { _id: orderId},
        {
            $set: {
                status

            },
          }
      );
  
      console.log('Updated order:', updatedOrder);
  
      res.status(200).json({ success: true, updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


module.exports = {
    fetchData,
    orderDetails,
    fetchOrderDetails,
    statusUpdate
}