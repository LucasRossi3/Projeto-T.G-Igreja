package br.com.projetomaestro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.projetomaestro.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long>{

}
