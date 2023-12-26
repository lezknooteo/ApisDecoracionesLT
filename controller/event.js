const EventModel = require("../model/Events/event");
const DecorationModel = require("../model/decorations");
const FoodsModelModel = require("../model/foods");
const ProductsModel = require("../model/products");
const ServiceModel = require("../model/services");
const EventDetailsDecorationsModel = require("../model/Events/eventDetailsDecorations");
const EventDetailsFoodsModel = require("../model/Events/eventDetailsFoods");
const EventDetailsProductsModel = require("../model/Events/eventDetailsProducts");
const EventDetailsServicesModel = require("../model/Events/eventDetailsServices");
const { where } = require("sequelize");

const getEvent = async (req, res) => {
  let mensaje = "";
  try {
    const events = await EventModel.findAll({
      include: [
        {
          model: EventDetailsDecorationsModel
        },
        {
          model: EventDetailsFoodsModel,
        },

        {
          model: EventDetailsProductsModel,
        },
        {
          model: EventDetailsServicesModel,
        },
      ],
    });
    console.log("buenas noches amigos" + events);
    mensaje = events;
  } catch (error) {
    mensaje = res.status(500).json({ error: error.message });
  }

  res.json({
    msg: mensaje,
  });
};


const getOneEvent = async (req, res) => {
  const id = req.params.id;
  let mensaje = "";

  try {
    const event = await EventModel.findOne({
      where: { id },
      include: [
        { model: EventDetailsDecorationsModel },
        { model: EventDetailsFoodsModel },
        { model: EventDetailsProductsModel },
        { model: EventDetailsServicesModel },
      ],
    });

    console.log("Buenas noches amigos: ", event);
    mensaje = event;
  } catch (error) {
    mensaje = { error: error.message };
    res.status(500);
  }

  res.json({ msg: mensaje });
};

const postEvent = async (req, res) => {
  const {
    // las que vienen del fronted
    eventDate,
    address,
    tel,
    totalEvent,
    payment,
    pending,
    stateId,
    userId,
    EventDetailsDecorations,
    EventDetailsFoods,
    EventDetailsProducts,
    EventDetailsServices,
  } = req.body;

  try {
      const newEvent = await EventModel.create({
      eventDate,
      address,
      tel,
      totalEvent,
      payment,
      pending,
      stateId,
      userId,
    });

    if (EventDetailsDecorations && EventDetailsDecorations.length > 0) {
      const instanceDecoration = EventDetailsDecorations.map(
        (EventDetailsDecoration) => ({
          unitPrice: EventDetailsDecoration.unitPrice,
          count: EventDetailsDecoration.count,
          total: EventDetailsDecoration.total,
          decorationId: EventDetailsDecoration.decorationId,
          eventId: newEvent.getDataValue("id"),
        })
      );
      //   el EventDetailsDecorationsModel es lo que trae del model
      await EventDetailsDecorationsModel.bulkCreate(instanceDecoration);
    }

    if (EventDetailsFoods && EventDetailsFoods.length > 0) {
      const instanceFood = EventDetailsFoods.map((EventDetailsFood) => ({
        unitPrice: EventDetailsFood.unitPrice,
        count: EventDetailsFood.count,
        total: EventDetailsFood.total,
        foodId: EventDetailsFood.foodId,
        eventId: newEvent.getDataValue("id"),
      }));
      //   el EventDetailsDecorationsModel es lo que trae del model
      await EventDetailsFoodsModel.bulkCreate(instanceFood);
    }

    if (EventDetailsProducts && EventDetailsProducts.length > 0) {
      const instanceProduct = EventDetailsProducts.map(
        (EventDetailsProduct) => ({
          unitPrice: EventDetailsProduct.unitPrice,
          count: EventDetailsProduct.count,
          total: EventDetailsProduct.total,
          productId: EventDetailsProduct.productId,
          eventId: newEvent.getDataValue("id"),
        })
      );
      //   el EventDetailsDecorationsModel es lo que trae del model
      await EventDetailsProductsModel.bulkCreate(instanceProduct);
    }

    if (EventDetailsServices && EventDetailsServices.length > 0) {
      const instanceService = EventDetailsServices.map(
        (EventDetailsService) => ({
          unitPrice: EventDetailsService.unitPrice,
          count: EventDetailsService.count,
          total: EventDetailsService.total,
          serviceId: EventDetailsService.serviceId,
          eventId: newEvent.getDataValue("id"),
        })
      );
      //   el EventDetailsDecorationsModel es lo que trae del model
      await EventDetailsServicesModel.bulkCreate(instanceService);
    }

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const eventFind = await EventModel.findByPk(eventId, {
      include: [
        { model: EventDetailsDecorationsModel },
        { model: EventDetailsFoodsModel },
        { model: EventDetailsProductsModel },
        { model: EventDetailsServicesModel },
      ],
    });


    if (!eventFind) {
      return res.status(404).json({ msg: "el evento no existe" });
    }

    const {
      eventDate,
      tel,
      address,
      totalEvent,
      payment,
      pending,
      stateId,
      userId,
      EventDetailsDecorations,
      EventDetailsFoods,
      EventDetailsProducts,
      EventDetailsServices,
    } = req.body;
   
    
    console.log("traigo lo de req.body");
    console.log(req.body);

    console.log("traigo el ID");
    console.log(eventId);   

    eventFind.eventDate = eventDate;
    eventFind.tel = tel;
    eventFind.address = address;
    eventFind.totalEvent = totalEvent;
    eventFind.payment = payment;
    eventFind.pending = pending;
    eventFind.stateId = stateId;
    eventFind.userId = userId;
    await eventFind.save();

    if (EventDetailsDecorations && EventDetailsDecorations.length > 0) {
      await EventDetailsDecorationsModel.destroy({
        where: { eventId: eventId },
      });
      const instanceDecoration = EventDetailsDecorations.map(
        (EventDetailsDecoration) => ({
          unitPrice: EventDetailsDecoration.unitPrice,
          count: EventDetailsDecoration.count,
          total: EventDetailsDecoration.total,
          decorationId: EventDetailsDecoration.decorationId,
          eventId: eventId,
        })
      );
      //   el EventDetailsDecorationsModel es lo que trae del model
      await EventDetailsDecorationsModel.bulkCreate(instanceDecoration);
    }

    if (EventDetailsFoods && EventDetailsFoods.length > 0) {
      await EventDetailsFoodsModel.destroy({ where: { eventId: eventId } });
      const instanceFood = EventDetailsFoods.map((EventDetailsFood) => ({
        count: EventDetailsFood.count,
        unitPrice: EventDetailsFood.unitPrice,
        total: EventDetailsFood.total,
        foodId: EventDetailsFood.foodId,
        eventId: eventId,
      }));
      await EventDetailsFoodsModel.bulkCreate(instanceFood);
    }

    if (EventDetailsProducts && EventDetailsProducts.length > 0) {
      await EventDetailsProductsModel.destroy({ where: { eventId: eventId } });
      const instanceProduct = EventDetailsProducts.map(
        (EventDetailsProduct) => ({
          count: EventDetailsProduct.count,
          unitPrice: EventDetailsProduct.unitPrice,
          total: EventDetailsProduct.total,
          productId: EventDetailsProduct.productId,
          eventId: eventFind.getDataValue("id"),
        })
      );
      //   el EventDetailsDecorationsModel es lo que trae del model
      await EventDetailsProductsModel.bulkCreate(instanceProduct);
    }

    if (EventDetailsServices && EventDetailsServices.length > 0) {
      await EventDetailsServicesModel.destroy({ where: { eventId: eventId } });
      const instanceService = EventDetailsServices.map(
        (EventDetailsService) => ({
          count: EventDetailsService.count,
          unitPrice: EventDetailsService.unitPrice,
          total: EventDetailsService.total,
          serviceId: EventDetailsService.serviceId,
          eventId: eventFind.getDataValue("id"),
        })
      );
      //   el EventDetailsDecorationsModel es lo que trae del model
      
      await EventDetailsServicesModel.bulkCreate(instanceService);
    }
    res.status(201).json('Modificado con exito');
  } catch (error) {
    res.status(500).json({ error: error.message });

  }
};

const deleteEvent = async (req, res) => {

  const { id } = req.params;
  const eventFind = await EventModel.findByPk(id);
  if (!eventFind) {
    return res.status(404).json({ msg: "el evento no existe" });
  }

  await EventDetailsDecorationsModel.destroy({ where: { eventId: id } });
  await EventDetailsFoodsModel.destroy({ where: { eventId: id } });
  await EventDetailsProductsModel.destroy({ where: { eventId: id } });
  await EventDetailsServicesModel.destroy({ where: { eventId: id } });

  await EventModel.destroy({ where: { id } });
};

module.exports = {
  getEvent,
  getOneEvent,
  postEvent,
  putEvent,
  deleteEvent,
};
