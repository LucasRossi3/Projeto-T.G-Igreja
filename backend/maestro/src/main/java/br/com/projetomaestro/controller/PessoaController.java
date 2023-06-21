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

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

	@Autowired
	private PessoaRepository pessoaRepository;

	@GetMapping
	public List<Pessoa> listar() {
		return pessoaRepository.findAll();
	}


	@GetMapping(path = { "/{codigo}" })
	public Optional<Pessoa> listaPessoa(@PathVariable Long codigo) {
		return pessoaRepository.findById(codigo);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Pessoa adicionar(@RequestBody Pessoa pessoa) {
		pessoaRepository.save(pessoa);
		return pessoa;
	}

	@DeleteMapping(path = { "/{codigo}" })
	public Optional<Pessoa> deletar(@PathVariable Long codigo) {
		Optional<Pessoa> p;
		p = listaPessoa(codigo);
		pessoaRepository.deleteById(codigo);
		return p;
		
	}
	
	@PutMapping(path = {"/{codigo}"})
	public Pessoa atualizar(@PathVariable Long codigo, @RequestBody Pessoa pessoa){
		System.out.println(pessoa.toString());
		Pessoa p = pessoaRepository.getReferenceById(codigo);
		updatePessoa(p, pessoa);
		return pessoaRepository.save(p);
	}


	private void updatePessoa(Pessoa p, Pessoa pessoa) {
		p.setNome(pessoa.getNome());
		p.setDataNascimentno(pessoa.getDataNascimentno());
		p.setSexo(pessoa.getSexo());
		p.setCpf(pessoa.getCpf());
		p.setRg(pessoa.getRg());
		p.setEmail(pessoa.getEmail());
		p.setCelular(pessoa.getCelular());
		p.setEndereco(pessoa.getEndereco());
		p.setNum_endereco(pessoa.getNum_endereco());
		p.setComplemento(pessoa.getComplemento());
		p.setBairro(pessoa.getBairro());
		p.setCidade(pessoa.getCidade());
		p.setUf(pessoa.getUf());
		p.setCep(pessoa.getCep());
		System.out.println(p.toString());
		
	}
	

}
