package br.com.projetomaestro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.projetomaestro.model.Pessoa;
import br.com.projetomaestro.repository.PessoaRepository;

public class PessoaService {

	@Autowired
	private PessoaRepository pessoaRepository;
	
	public List<Pessoa> listar() {
		return pessoaRepository.findAll();
	}
	
	public Optional<Pessoa> listarPessoa(@PathVariable Long codigo) {
		return pessoaRepository.findById(codigo);
	}
	
	public Pessoa adicionar(@RequestBody Pessoa pessoa) {
		return	pessoaRepository.save(pessoa);
	}
	
	public Optional<Pessoa> deletar(@PathVariable Long codigo) {
		Optional<Pessoa> p;
		p = listarPessoa(codigo);
		pessoaRepository.deleteById(codigo);
		return p;
		
	}
	
	public Pessoa atualizar(@PathVariable Long codigo, @RequestBody Pessoa pessoa){
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
		p.setFamilia(pessoa.getFamilia());
		p.setMembro(pessoa.getMembro());
		p.setUsuario(pessoa.getUsuario());
	}
}
