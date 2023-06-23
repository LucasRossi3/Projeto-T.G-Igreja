package br.com.projetomaestro.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.com.projetomaestro.model.Pessoa;
import br.com.projetomaestro.service.PessoaService;

@RestController
@RequestMapping("/pessoas")
public class PessoaController {

	@Autowired
	PessoaService pessoaService;

	@GetMapping
	public ResponseEntity<List<Pessoa>> findAll() {
		List<Pessoa> lista = pessoaService.findAll();
		
		return ResponseEntity.ok().body(lista);
	}

	@GetMapping("/{idPessoa}")
	public ResponseEntity<Pessoa> findById(@PathVariable Long idPessoa) {
		Pessoa pessoa = pessoaService.findById(idPessoa);
		
		return ResponseEntity.ok().body(pessoa);
	}

	@PostMapping
//	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Pessoa> insert(@RequestBody Pessoa pessoa) {
		pessoa = pessoaService.insert(pessoa);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(pessoa.getIdPessoa()).toUri();
		
		return ResponseEntity.created(uri).body(pessoa);
	}

	@DeleteMapping("/{idPessoa}")
	public ResponseEntity<Void> delete(@PathVariable Long idPessoa) {
		pessoaService.delete(idPessoa);
		
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/{idPessoa}")
	public ResponseEntity<Pessoa> update(@PathVariable Long idPessoa, @RequestBody Pessoa pessoa) {
		pessoa = pessoaService.update(idPessoa, pessoa);
		
		return ResponseEntity.ok().body(pessoa);
	}
}
