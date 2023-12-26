const PriceModel = require("../model/price/price");
const DecorationModel = require("../model/decorations");
const FoodsModelModel = require("../model/foods");
const ProductsModel = require("../model/products");
const ServiceModel = require("../model/services");
const PriceDetailsDecorationsModel = require("../model/price/priceDetailsDecorations");
const PriceDetailsFoodsModel = require("../model/price/priceDetailsFoods");
const PriceDetailsProductsModel = require("../model/price/priceDetailsProducts");
const PriceDetailsServicesModel = require("../model/price/priceDetailsServices");

const getPrice = async (req, res) => {
  let mensaje = "";
  try {
    const prices = await PriceModel.findAll({
      include: [
        {
          model: PriceDetailsDecorationsModel
        },
        {
          model: PriceDetailsFoodsModel,
        },

        {
          model: PriceDetailsProductsModel,
        },
        {
          model: PriceDetailsServicesModel,
        },
      ],
    });
    console.log("buenas noches amigos" + prices);
    mensaje = prices;
  } catch (error) {
    mensaje = res.status(500).json({ error: error.message });
  }

  res.json({
    msg: mensaje,
  });
};

const postPrice = async (req, res) => {
  const {
    // las que vienen del fronted
    priceDate,
    address,
    tel,
    totalPrice,
    payment,
    pending,
    stateId,
    userId,
    PriceDetailsDecorations,
    PriceDetailsFoods,
    PriceDetailsProducts,
    PriceDetailsServices,
  } = req.body;

  console.log(req.body)

  try {
    if (
      !priceDate ||
      !address ||
      !totalPrice ||
      !payment ||
      !pending ||
      !userId
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const newPrice = await PriceModel.create({
      priceDate,
      address,
      tel,
      totalPrice,
      payment,
      pending,
      stateId,
      userId,
    });

    if (PriceDetailsDecorations && PriceDetailsDecorations.length > 0) {
      const instanceDecoration = PriceDetailsDecorations.map(
        (PriceDetailsDecoration) => ({
          unitPrice: PriceDetailsDecoration.unitPrice,
          count: PriceDetailsDecoration.count,
          total: PriceDetailsDecoration.total,
          decorationId: PriceDetailsDecoration.decorationId,
          priceId: newPrice.getDataValue("id"),
        })
      );
      //   el PriceDetailsDecorationsModel es lo que trae del model
      await PriceDetailsDecorationsModel.bulkCreate(instanceDecoration);
    }

    if (PriceDetailsFoods && PriceDetailsFoods.length > 0) {
      const instanceFood = PriceDetailsFoods.map((PriceDetailsFood) => ({
        unitPrice: PriceDetailsFood.unitPrice,
        count: PriceDetailsFood.count,
        total: PriceDetailsFood.total,
        foodId: PriceDetailsFood.foodId,
        priceId: newPrice.getDataValue("id"),
      }));
      //   el PriceDetailsDecorationsModel es lo que trae del model
      await PriceDetailsFoodsModel.bulkCreate(instanceFood);
    }

    if (PriceDetailsProducts && PriceDetailsProducts.length > 0) {
      const instanceProduct = PriceDetailsProducts.map(
        (PriceDetailsProduct) => ({
          unitPrice: PriceDetailsProduct.unitPrice,
          count: PriceDetailsProduct.count,
          total: PriceDetailsProduct.total,
          productId: PriceDetailsProduct.productId,
          priceId: newPrice.getDataValue("id"),
        })
      );
      //   el PriceDetailsDecorationsModel es lo que trae del model
      await PriceDetailsProductsModel.bulkCreate(instanceProduct);
    }

    if (PriceDetailsServices && PriceDetailsServices.length > 0) {
      const instanceService = PriceDetailsServices.map(
        (PriceDetailsService) => ({
          unitPrice: PriceDetailsService.unitPrice,
          count: PriceDetailsService.count,
          total: PriceDetailsService.total,
          serviceId: PriceDetailsService.serviceId,
          priceId: newPrice.getDataValue("id"),
        })
      );
      //   el PriceDetailsDecorationsModel es lo que trae del model
      await PriceDetailsServicesModel.bulkCreate(instanceService);
    }

    res.status(201).json(newPrice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putPrice = async (req, res) => {
  try {
    const {
      priceDate,
      tel,
      address,
      totalPrice,
      payment,
      pending,
      stateId,
      userId,
      PriceDetailsDecorations,
      PriceDetailsFoods,
      PriceDetailsProducts,
      PriceDetailsServices,
    } = req.body;
    const priceId = req.params.id;
    
    console.log("traigo lo de req.body");
    console.log(req.body);

    console.log("traigo el ID");
    console.log(priceId);

    const priceFind = await PriceModel.findByPk(priceId);

    if (!priceFind) {
      return res.status(404).json({ msg: "el priceo no existe" });
    }

    // await priceFind.update({
    //   priceDate,
    //   tel,
    //   address,
    //   totalPrice,
    //   payment,
    //   pending,
    //   stateId,
    // });

    priceFind.priceDate = priceDate;
    priceFind.tel = tel;
    priceFind.address = address;
    priceFind.totalPrice = totalPrice;
    priceFind.payment = payment;
    priceFind.pending = pending;
    priceFind.stateId = stateId;
    priceFind.userId = userId;
    await priceFind.save();

    if (PriceDetailsDecorations && PriceDetailsDecorations.length > 0) {
      await PriceDetailsDecorationsModel.destroy({
        where: { priceId: priceId },
      });
      const instanceDecoration = PriceDetailsDecorations.map(
        (PriceDetailsDecoration) => ({
          unitPrice: PriceDetailsDecoration.unitPrice,
          count: PriceDetailsDecoration.count,
          total: PriceDetailsDecoration.total,
          decorationId: PriceDetailsDecoration.decorationId,
          priceId: priceId,
        })
      );
      //   el PriceDetailsDecorationsModel es lo que trae del model
      await PriceDetailsDecorationsModel.bulkCreate(instanceDecoration);
    }

    if (PriceDetailsFoods && PriceDetailsFoods.length > 0) {
      await PriceDetailsFoodsModel.destroy({ where: { priceId: priceId } });
      const instanceFood = PriceDetailsFoods.map((PriceDetailsFood) => ({
        count: PriceDetailsFood.count,
        unitPrice: PriceDetailsFood.unitPrice,
        total: PriceDetailsFood.total,
        foodId: PriceDetailsFood.foodId,
        priceId: priceId,
      }));
      await PriceDetailsFoodsModel.bulkCreate(instanceFood);
    }

    if (PriceDetailsProducts && PriceDetailsProducts.length > 0) {
      await PriceDetailsProductsModel.destroy({ where: { priceId: priceId } });
      const instanceProduct = PriceDetailsProducts.map(
        (PriceDetailsProduct) => ({
          count: PriceDetailsProduct.count,
          unitPrice: PriceDetailsProduct.unitPrice,
          total: PriceDetailsProduct.total,
          productId: PriceDetailsProduct.productId,
          priceId: priceFind.getDataValue("id"),
        })
      );
      //   el PriceDetailsDecorationsModel es lo que trae del model
      await PriceDetailsProductsModel.bulkCreate(instanceProduct);
    }

    if (PriceDetailsServices && PriceDetailsServices.length > 0) {
      await PriceDetailsServicesModel.destroy({ where: { priceId: priceId } });
      const instanceService = PriceDetailsServices.map(
        (PriceDetailsService) => ({
          count: PriceDetailsService.count,
          unitPrice: PriceDetailsService.unitPrice,
          total: PriceDetailsService.total,
          serviceId: PriceDetailsService.serviceId,
          priceId: priceFind.getDataValue("id"),
        })
      );
      //   el PriceDetailsDecorationsModel es lo que trae del model
      
      await PriceDetailsServicesModel.bulkCreate(instanceService);
    }
    res.status(201).json('Modificado con exito');
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
};

const deletePrice = async (req, res) => {

  const { id } = req.params;
  const priceFind = await PriceModel.findByPk(id);
  if (!priceFind) {
    return res.status(404).json({ msg: "el price no existe" });
  }

  await PriceDetailsDecorationsModel.destroy({ where: { priceId: id } });
  await PriceDetailsFoodsModel.destroy({ where: { priceId: id } });
  await PriceDetailsProductsModel.destroy({ where: { priceId: id } });
  await PriceDetailsServicesModel.destroy({ where: { priceId: id } });

  await PriceModel.destroy({ where: { id } });
};

module.exports = {
  getPrice,
  postPrice,
  putPrice,
  deletePrice,
};
