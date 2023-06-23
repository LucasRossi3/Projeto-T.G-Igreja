package br.com.projetomaestro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetomaestro.model.Membro;
import br.com.projetomaestro.repository.MembroRepository;

@RestController
@RequestMapping("/membro")
public class MembroCotroller {
	@Autowired
	private MembroRepository membroRepository;

	@GetMapping
	public List<Membro> listar() {
		return membroRepository.findAll();
	}
}
