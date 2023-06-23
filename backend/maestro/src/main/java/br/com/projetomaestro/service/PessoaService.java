package br.com.projetomaestro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.projetomaestro.model.Pessoa;
import br.com.projetomaestro.repository.PessoaRepository;
import br.com.projetomaestro.service.exception.DatabaseException;
import br.com.projetomaestro.service.exception.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository pessoaRepository;
	
	public List<Pessoa> findAll() {
		return pessoaRepository.findAll();
	}
	
	public Pessoa findById(@PathVariable Long idPessoa) {
		Optional<Pessoa> obj = pessoaRepository.findById(idPessoa);
		
		return obj.orElseThrow(() -> new ResourceNotFoundException(idPessoa));
	}
	
	public Pessoa insert(Pessoa pessoa) {
		return pessoaRepository.save(pessoa);
	}
	
	public void delete(@PathVariable Long idPessoa) {
		try {
			findById(idPessoa);
			pessoaRepository.deleteById(idPessoa);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException(e.getMessage());
		}
	}
	
	public Pessoa update(@PathVariable Long idPessoa, @RequestBody Pessoa pessoa) {
		try {
			Pessoa entity = pessoaRepository.getReferenceById(idPessoa);
			updatePessoa(entity, pessoa);
			
			return pessoaRepository.save(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException(idPessoa);
		}
	}


	private void updatePessoa(Pessoa p, Pessoa pessoa) {
		p.setNome(pessoa.getNome());
//		p.setDataNascimentno(pessoa.getDataNascimentno());
		p.setSexo(pessoa.getSexo());
		p.setCpf(pessoa.getCpf());
		p.setRg(pessoa.getRg());
		p.setEmail(pessoa.getEmail());
		p.setTelefone(pessoa.getTelefone());
		p.setEndereco(pessoa.getEndereco());
		p.setNumEndereco(pessoa.getNumEndereco());
		p.setComplemento(pessoa.getComplemento());
		p.setBairro(pessoa.getBairro());
		p.setCidade(pessoa.getCidade());
		p.setUf(pessoa.getUf());
		p.setCep(pessoa.getCep());
//		p.setFamilia(pessoa.getFamilia());
		p.setMembro(pessoa.getMembro());
		p.setUsuario(pessoa.getUsuario());
	}
}
