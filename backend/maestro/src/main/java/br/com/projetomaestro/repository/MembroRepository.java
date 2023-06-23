package br.com.projetomaestro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.projetomaestro.model.Membro;

@Repository
public interface MembroRepository extends JpaRepository<Membro, Long>{

}
