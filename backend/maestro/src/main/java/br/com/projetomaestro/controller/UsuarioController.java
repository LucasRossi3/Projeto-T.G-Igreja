package br.com.projetomaestro.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetomaestro.model.Usuario;
import br.com.projetomaestro.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@GetMapping
	public List<Usuario> listar() {
		return usuarioRepository.findAll();
	}

	@GetMapping(path = { "/{codigo}" })
	public Optional<Usuario> listarUsuario(@PathVariable Long codigo) {
		return usuarioRepository.findById(codigo);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario adicionar(@RequestBody Usuario usuario) {
		return usuarioRepository.save(usuario);
	}

	@DeleteMapping(path = { "/{codigo}" })
	public Optional<Usuario> deletar(@PathVariable Long codigo) {
		Optional<Usuario> u = listarUsuario(codigo);
		usuarioRepository.deleteById(codigo);
		return u;
	}
	
	@PutMapping(path = {"/{codigo}"})
	public Usuario atualizar(@PathVariable Long codigo, @RequestBody Usuario usuario){
		Usuario u = usuarioRepository.getReferenceById(codigo);
		updateUsuario(u, usuario);
		return usuarioRepository.save(u);
	}


	private void updateUsuario(Usuario u, Usuario usuario) {
//		u.setPessoa(usuario.getPessoa());
//		u.setLogin(usuario.getLogin());
//		u.setSenha(usuario.getSenha());
	}
}
