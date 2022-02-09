const getUsers = () => ({
  path: 'users',
  errorMessage: 'Erro ao buscar usuarios',
  showSuccessModal: true,
  successMessage: 'Usuarios buscados com sucesso!!!!!',
});

const userService = { getUsers };

export default userService;
