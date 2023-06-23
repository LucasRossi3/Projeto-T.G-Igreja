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

import br.com.projetomaestro.model.Pessoa;
import br.com.projetomaestro.service.PessoaService;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

	@Autowired
	PessoaService pessoaService;

	@GetMapping
	public List<Pessoa> listar() {
		return pessoaService.listar();
	}


	@GetMapping(path = { "/{codigo}" })
	public Optional<Pessoa> listarPessoa(@PathVariable Long codigo) {
		return pessoaService.listarPessoa(codigo);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Pessoa adicionar(@RequestBody Pessoa pessoa) {
		return pessoaService.adicionar(pessoa);
	}

	@DeleteMapping(path = { "/{codigo}" })
	public Optional<Pessoa> deletar(@PathVariable Long codigo) {
		return pessoaService.deletar(codigo);
		
		
	}
	
	@PutMapping(path = {"/{codigo}"})
	public Pessoa atualizar(@PathVariable Long codigo, @RequestBody Pessoa pessoa){
		return pessoaService.atualizar(codigo, pessoa);
	}
	

}
