package br.com.projetomaestro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetomaestro.model.Familia;

@RestController
@RequestMapping("/familia")
public class FamiliaController {

	@Autowired
	private FamiliaRepository familiaRepository;

	@GetMapping
	public List<Familia> listar() {
		return familiaRepository.findAll();
	}
}
