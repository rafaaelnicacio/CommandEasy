const { response } = require("express");
const userModels = require("../models/user");

module.exports = {
  async create(request, response) {
    const { email } = request.body;
    try {
      if (await userModels.findOne({ email })) {
        return response.status(400).json({ error: "Usuário já cadastrado" });
      }
      const user = await userModels.create(request.body);
      return response.status(200).json({ user });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  async delete(request, response) {
    try {
      await response.item.remove();
      return response.status(200).json({ message: "Item removido da Comanda" });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  },
};
